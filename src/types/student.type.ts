import { Gender } from "../enum/auth.enum";

export interface CreateStudent {
    name: string;
    email: string;
    password: string;
    rollNumber: string;
    className: string;
    gender: Gender;
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    parentId?: number;
    profilePicture?: string;
}

export interface UpdateStudent {
    name?: string;
    email?: string;
    password?: string;
    rollNumber?: string;
    className?: string;
    gender?: Gender;
    dateOfBirth?: string;
    phone?: string;
    address?: string;
    parentId?: number;
    profilePicture?: string;
}
