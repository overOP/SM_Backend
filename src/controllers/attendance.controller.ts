import { Request, Response } from "express";

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import {
  addAttendanceServices,
  deleteAttendanceServices,
  getAllAttendanceServices,
  getAttendanceByIdServices,
  updateAttendanceByIdServices,
} from "../services/attendance.service";

class AttendanceController {
  static async addAttendance(req: Request, res: Response) {
    try {
      const { studentId, AttendanceStatus } = req.body;
      const attendances = await addAttendanceServices(
        studentId,
        AttendanceStatus,
      );
      return sendSuccessResponse(
        res,
        "Attendance added successfully",
        attendances,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error adding attendance", 400);
    }
  }
  static async getAllAttendance(req: Request, res: Response) {
    try {
      const attendances = await getAllAttendanceServices();
      return sendSuccessResponse(
        res,
        "Attendance fetched successfully",
        attendances,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching attendance", 400);
    }
  }

  static async getAttendanceById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const attendances = await getAttendanceByIdServices(id as any);
      return sendSuccessResponse(
        res,
        "Attendance fetched successfully",
        attendances,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching attendance", 400);
    }
  }

  static async updateAttendanceById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = req.body;
      const attendances = await updateAttendanceByIdServices(id as any, data);
      return sendSuccessResponse(
        res,
        "Attendance updated successfully",
        attendances,
        201,
      );
    } catch (err: any) {
      if (err.message === "ATTENDANCE_NOT_FOUND") {
        return sendErrorResponse(res, "Attendance not found", 400);
      }
      return sendErrorResponse(res, "Error updating attendance", 400);
    }
  }
  static async deleteAttendance(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const attendances = await deleteAttendanceServices(id as any);
      return sendSuccessResponse(
        res,
        "Attendance deleted successfully",
        attendances,
        201,
      );
    } catch (err: any) {
      if (err.message === "ATTENDANCE_NOT_FOUND") {
        return sendErrorResponse(res, "Attendance not found", 400);
      }
      return sendErrorResponse(res, "Error deleting attendance", 400);
    }
  }
}

export default AttendanceController;
