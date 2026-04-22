import { Request, Response } from "express";

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import {
  addSubjectServices,
  deleteSubjectServices,
  getAllSubjectServices,
  getSubjectByIdServices,
  updateSubjectByIdServices,
} from "../services/subject.service";

class SubjectController {
  static async addSubject(req: Request, res: Response) {
    try {
      const { subjectName, subjectCode, fullMarks, passMarks } = req.body;

      const subjects = await addSubjectServices(
        subjectName,
        subjectCode,
        fullMarks,
        passMarks,
      );
      return sendSuccessResponse(
        res,
        "Subject added successfully",
        subjects,
        201,
      );
    } catch (err: any) {
      console.log("ADD SUBJECT ERROR:", err);
      return sendErrorResponse(res, "Error adding subject", 400);
    }
  }

  static async getAllSubject(req: Request, res: Response) {
    try {
      const subjects = await getAllSubjectServices();
      return sendSuccessResponse(
        res,
        "Subject fetched successfully",
        subjects,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching subject", 400);
    }
  }

  static async getSubjectById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;

      const subjects = await getSubjectByIdServices(id);
      return sendSuccessResponse(
        res,
        "Subject fetched successfully",
        subjects,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching subject", 400);
    }
  }

  static async updateSubjectById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = req.body;
      const subjects = await updateSubjectByIdServices(id as any, data);
      return sendSuccessResponse(
        res,
        "Subject updated successfully",
        subjects,
        201,
      );
    } catch (err: any) {
      if (err.message === "SUBJECT_NOT_FOUND") {
        return sendErrorResponse(res, "Subject not found", 400);
      }
      return sendErrorResponse(res, "Error updating subject", 400);
    }
  }

  static async deleteSubject(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const subjects = await deleteSubjectServices(id as any);
      return sendSuccessResponse(
        res,
        "Subject deleted successfully",
        subjects,
        201,
      );
    } catch (err: any) {
      if (err.message === "SUBJECT_NOT_FOUND") {
        return sendErrorResponse(res, "Subject not found", 400);
      }
      return sendErrorResponse(res, "Error deleting subject", 400);
    }
  }
}

export default SubjectController;
