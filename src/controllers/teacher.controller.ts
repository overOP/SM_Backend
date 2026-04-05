import { Request, Response } from "express";
import { TeacherService } from "../services/teacher.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper";

export class TeacherController {
    static async createTeacher(req: Request, res: Response) {
        try {
            const teacher = await TeacherService.createTeacher(req.body);
            sendSuccessResponse(res, "Teacher created successfully", teacher, 201);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getAllTeachers(_req: Request, res: Response) {
        try {
            const teachers = await TeacherService.getAllTeachers();
            sendSuccessResponse(res, "Teachers fetched successfully", teachers, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getTeacherById(req: Request, res: Response) {
        try {
            const teacher = await TeacherService.getTeacherById(Number(req.params.id));
            sendSuccessResponse(res, "Teacher fetched successfully", teacher, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }

    static async getTeachersBySubject(req: Request, res: Response) {
        try {
            const teachers = await TeacherService.getTeachersBySubject(req.params.subject);
            sendSuccessResponse(res, "Teachers fetched successfully", teachers, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async updateTeacher(req: Request, res: Response) {
        try {
            const teacher = await TeacherService.updateTeacher(Number(req.params.id), req.body);
            sendSuccessResponse(res, "Teacher updated successfully", teacher, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async deleteTeacher(req: Request, res: Response) {
        try {
            const result = await TeacherService.deleteTeacher(Number(req.params.id));
            sendSuccessResponse(res, result.message, null, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }
}
