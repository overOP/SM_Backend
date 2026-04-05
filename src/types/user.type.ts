import { Gender, Role } from "../enum/auth.enum";

export interface CreateUsers{
     name:string;
        email:string;
        role:Role;
        gender:Gender;
}

export interface UpdateUsers{
     name:string;
    email:string;
    role:Role;
    gender:Gender;
}
