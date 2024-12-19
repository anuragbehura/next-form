"use server";

import { currentUser } from "@clerk/nextjs/server";
import mongoose from 'mongoose';
import { Form } from '../Model/formModel';
import { formSchemaType, formSchema } from "@/schema/form";
import { connectToDatabase } from "@/utils/dbConnect";
import { createSlug } from "@/utils/slug";

class UserNotFoundErr extends Error { }

export async function GetFormStats() {
    // Use auth() to get user ID instead of currentUser()
    const user = await currentUser();

    if (!user) {
        throw new UserNotFoundErr()
    }

    // Ensure MongoDB connection
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI!);
    }

    // Aggregate form stats for the user
    const stats = await Form.aggregate([
        // Match forms for the specific user
        { $match: { userId: user.id } },

        // Group to calculate total visits and submissions
        {
            $group: {
                _id: null,
                totalVisits: { $sum: '$visits' },
                totalSubmissions: { $sum: '$submission' }
            }
        }
    ]);

    // Extract values or default to 0
    const visits = stats[0]?.totalVisits || 0;
    const submissions = stats[0]?.totalSubmissions || 0;

    // Calculate submission and bounce rates
    let submissionRate = 0;
    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate
    }
}

export async function CreateForm(data: formSchemaType) {
    const validation = formSchema.safeParse(data);
    if (!validation.success) {
        console.error("Validation errors:", validation.error.errors);
        throw new Error(`Form validation failed: ${validation.error.errors.map(e => e.message).join(', ')}`);
    }

    const user = await currentUser();
    if (!user) {
        console.error("No user found");
        throw new UserNotFoundErr();
    }

    const { name, description } = data;
    const slug = createSlug(name);

    try {
        await connectToDatabase();
        const form = await Form.create({
            userId: user.id,
            name,
            slug,
            description,
            // Add default values to match your schema
            // published: false,
            // visits: 0,
            // submissions: 0,
            // shareURL: uuidv4() // Make sure to import uuid
        });

        console.log("Form created successfully:", form);

        return {
            slug: form.slug,
            id: form._id.toString(),
            name: form.name,
            description: form.description
        };
    } catch (error) {
        // Log the full error details
        console.error("Detailed error creating form:", error);

        // If it's a mongoose validation error, provide more details
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error(`Form validation failed: ${error.message}`);
        }

        // For other types of errors, throw with more context
        throw new Error(`Failed to create form: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    await connectToDatabase();
    return await Form.find({
         userId: user.id 
        }).sort({ 
            createdAt: -1 
    });
}

// export async function GetFormById(id: string) {
//     const user = await currentUser();
//     if (!user) {
//         throw new UserNotFoundErr();
//     }

//     await connectToDatabase();

//     // Check if the ID is a valid ObjectId
//     // if (!mongoose.Types.ObjectId.isValid(id)) {
//     //     throw new Error("Invalid form ID");
//     // }

//     return await Form.findById(id).where('userId', user.id);
// }


export async function GetFormBySlug(slug: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    await connectToDatabase();

    // Check if the ID is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     throw new Error("Invalid form ID");
    // }

    const form = await Form.findOne({ slug, userId: user.id });

    // Convert Mongoose document to a plain object
    return form ? {
        _id: form._id.toString(), // Convert ObjectId to string
        userId: form.userId,
        name: form.name,
        slug: form.slug,
        description: form.description,
        // ... other properties you need
    } : null;
}