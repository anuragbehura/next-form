import mongoose from 'mongoose';

interface IFormSubmission {
    formId: mongoose.Types.ObjectId;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const FormSubmissionSchema = new mongoose.Schema<IFormSubmission>({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const FormSubmission = mongoose.models.FormSubmissions || 
    mongoose.model<IFormSubmission>('FormSubmissions', FormSubmissionSchema);