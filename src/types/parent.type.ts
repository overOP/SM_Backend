import { Gender } from "../enum/auth.enum";

export interface CreateParent {
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: Gender;
    address?: string;
    occupation?: string;
    profilePicture?: string;
}

export interface UpdateParent{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    gender?: Gender;
    address?: string;
    occupation?: string;
    profilePicture?: string;
}
