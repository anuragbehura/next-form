// utils/dbConnect.ts
import mongoose from 'mongoose';

export async function connectToDatabase() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI!);
    }
}