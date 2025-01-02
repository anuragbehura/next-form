export interface IFormPlain {
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
    updatedAt: Date;
    FormSubmissions?: string[]; // Assuming ObjectId will be converted to strings
}
