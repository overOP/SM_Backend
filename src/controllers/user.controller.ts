import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper";

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            sendSuccessResponse(res, "User created successfully", user, 201);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            sendSuccessResponse(res, "Users fetched successfully", users, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getUserById(req: Request, res: Response) {
        try {
            const user = await UserService.getUserById(Number(req.params.id));
            sendSuccessResponse(res, "User fetched successfully", user, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const user = await UserService.updateUser(Number(req.params.id), req.body);
            sendSuccessResponse(res, "User updated successfully", user, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const result = await UserService.deleteUser(Number(req.params.id));
            sendSuccessResponse(res, result.message, null, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }
}
