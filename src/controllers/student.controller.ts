import { Request, Response } from "express";
import { StudentService } from "../services/student.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/responseHelper";

export class StudentController {
    static async createStudent(req: Request, res: Response) {
        try {
            const student = await StudentService.createStudent(req.body);
            sendSuccessResponse(res, "Student created successfully", student, 201);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getAllStudents(_req: Request, res: Response) {
        try {
            const students = await StudentService.getAllStudents();
            sendSuccessResponse(res, "Students fetched successfully", students, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getStudentById(req: Request, res: Response) {
        try {
            const student = await StudentService.getStudentById(Number(req.params.id));
            sendSuccessResponse(res, "Student fetched successfully", student, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }

    static async getStudentsByClass(req: Request, res: Response) {
        try {
            const students = await StudentService.getStudentsByClass(req.params.className);
            sendSuccessResponse(res, "Students fetched successfully", students, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async getStudentsByParentId(req: Request, res: Response) {
        try {
            const students = await StudentService.getStudentsByParentId(Number(req.params.parentId));
            sendSuccessResponse(res, "Students fetched successfully", students, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async updateStudent(req: Request, res: Response) {
        try {
            const student = await StudentService.updateStudent(Number(req.params.id), req.body);
            sendSuccessResponse(res, "Student updated successfully", student, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 500);
        }
    }

    static async deleteStudent(req: Request, res: Response) {
        try {
            const result = await StudentService.deleteStudent(Number(req.params.id));
            sendSuccessResponse(res, result.message, null, 200);
        } catch (error: any) {
            sendErrorResponse(res, error.message, 404);
        }
    }
}
