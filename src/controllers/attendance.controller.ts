import { Request, Response } from "express";

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import {
  addAttendanceServices,
  deleteAttendanceServices,
  downloadAttendanceServices,
  getAllAttendanceServices,
  getAttendanceByIdServices,
  updateAttendanceByIdServices,
} from "../services/attendance.service";

class AttendanceController {
  static async addAttendance(req: Request, res: Response) {
    try {
      const { studentId, AttendanceStatus, subjectId } = req.body;
      const attendances = await addAttendanceServices(
        studentId,
        subjectId,
        AttendanceStatus,
      );
      return sendSuccessResponse(
        res,
        "Attendance added successfully",
        attendances,
        200,
      );
    } catch (err: any) {
      console.log(err.message);
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
      console.log(err.message);
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

  static async downloadAttendance(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const attendances = await downloadAttendanceServices(id as any);
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        "attachment;filename=attendance.pdf",
      );
      return res.send(attendances);
    } catch (err: any) {
      console.log(err.message);
      if (err.message === "ATTENDANCE_NOT_FOUND") {
        return sendErrorResponse(res, "Attendance not found", 400);
      }
      return sendErrorResponse(res, "Error downloading attendance", 400);
    }
  }
}

export default AttendanceController;
