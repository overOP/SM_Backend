//logic
import User from "../models/user.model";
import { CreateUsers, UpdateUsers } from "../types/user.type";

export class UserService{
    static async createUser(data:CreateUsers){
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            throw new Error(`Error creating user:${error}`);
        }
    }

    static async getAllUsers(){
        try {
            const users=await User.findAll();
            return users;
        } catch (error) {
            throw new Error(`Error fetching users:${error}`);
        }
    }

    static async getUserById(id:number){
        try {
            const user=await User.findByPk(id);
            if(!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw new Error(`Error fetching user:${error}`);
        }
    }

    static async updateUser(id:number, data:UpdateUsers){
        try {
            const user=await User.findByPk(id);
            if(!user) throw new Error("User not found");
            await user.update(data);
            return user;
        } catch (error) {
            throw new Error(`Error updating user:${error}`);
        }
    }

    static async deleteUser(id:number){
        try {
            const user=await User.findByPk(id);
            if(!user) throw new Error("User not found");
            await user.destroy();
            return { message:"User deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting user:${error}`);
        }
    }
}
