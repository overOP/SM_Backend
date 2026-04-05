import { Gender } from "../enum/auth.enum";

export interface CreateTeacher {
    name: string;
    email: string;
    password: string;
    employeeId: string;
    subject: string;
    gender: Gender;
    phone?: string;
    address?: string;
    dateJoined?: string;
    profilePicture?: string;
}

export interface UpdateTeacher {
    name?: string;
    email?: string;
    password?: string;
    employeeId?: string;
    subject?: string;
    gender?: Gender;
    phone?: string;
    address?: string;
    dateJoined?: string;
    profilePicture?: string;
}
