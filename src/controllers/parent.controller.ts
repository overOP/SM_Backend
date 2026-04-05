import { Request, Response } from "express";
import { ParentService } from "../services/parent.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper";

export class ParentController {
    static async createParent(req: Request, res: Response) {
        try {
            const parent = await ParentService.createParent(req.body);
            sendSuccessResponse(res, "Parent created successfully", parent, 201);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getAllParents(_req: Request, res: Response) {
        try {
            const parents = await ParentService.getAllParents();
            sendSuccessResponse(res, "Parents fetched successfully", parents, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getParentById(req: Request, res: Response) {
        try {
            const parent = await ParentService.getParentById(Number(req.params.id));
            sendSuccessResponse(res, "Parent fetched successfully", parent, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }

    static async getParentWithChildren(req: Request, res: Response) {
        try {
            const result = await ParentService.getParentWithChildren(Number(req.params.id));
            sendSuccessResponse(res, "Parent with children fetched successfully", result, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }

    static async updateParent(req: Request, res: Response) {
        try {
            const parent = await ParentService.updateParent(Number(req.params.id), req.body);
            sendSuccessResponse(res, "Parent updated successfully", parent, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async deleteParent(req: Request, res: Response) {
        try {
            const result = await ParentService.deleteParent(Number(req.params.id));
            sendSuccessResponse(res, result.message, null, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }
}
