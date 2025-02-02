import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interface to define the document structure
export interface IForm extends mongoose.Document {
  _id: string;
  userId: string;
  createdAt: Date;
  published: boolean;
  name: string;
  slug: string;
  description: string;
  content: string;
  visits: number;
  submissions: number;
  shareURL: string;
  FormSubmissions?: mongoose.Types.ObjectId[];
  updatedAt: Date;
}

// Create the schema
const FormSchema = new mongoose.Schema<IForm>({
  userId: { 
    type: String, 
    unique: false,
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  published: { 
    type: Boolean, 
    default: false 
  },
  name: { 
    type: String,
    unique: false, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  content: { 
    type: String, 
    default: '[]' 
  },
  visits: { 
    type: Number, 
    default: 0 
  },
  submissions: { 
    type: Number, 
    default: 0 
  },
  shareURL: { 
    type: String,
    unique: true, 
    default: () => uuidv4() 
  },
  FormSubmissions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'FormSubmissions' 
  }]
}, {
  timestamps: true
});

// Prevent model recompilation
export const Form = mongoose.models.Form || mongoose.model<IForm>('Form', FormSchema);




