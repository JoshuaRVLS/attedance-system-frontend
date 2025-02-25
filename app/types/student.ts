import { Class } from "./class";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    isPresent: boolean; 
    class: Class;
    photo: {
        data: Buffer;
        mimetype: string,
    }
}