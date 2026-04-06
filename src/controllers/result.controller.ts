import { Request, Response } from "express";

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import {
  addResultServices,
  deleteResultServices,
  getAllResultServices,
  getResultByIdServices,
  updateResultByIdServices,
} from "../services/result.service";

class ResultController {
  static async addResult(req: Request, res: Response) {
    try {
      const { subject, marks, grade, status, userId } = req.body;

      const results = await addResultServices(
        subject,
        marks,
        grade,
        status,
        userId,
      );
      return sendSuccessResponse(
        res,
        "Result added successfully",
        results,
        201,
      );
    } catch (err: any) {
      console.log("ADD RESULT ERROR:", err);
      return sendErrorResponse(res, "Error adding result", 400);
    }
  }

  static async getAllResult(req: Request, res: Response) {
    try {
      const results = await getAllResultServices();
      return sendSuccessResponse(
        res,
        "Result fetched successfully",
        results,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching result", 400);
    }
  }

  static async getResultById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;

      const results = await getResultByIdServices(id);
      return sendSuccessResponse(
        res,
        "Result fetched successfully",
        results,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching result", 400);
    }
  }

  static async updateResultById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = req.body;
      const results = await updateResultByIdServices(id as any, data);
      return sendSuccessResponse(
        res,
        "Result updated successfully",
        results,
        201,
      );
    } catch (err: any) {
      if (err.message === "RESULT_NOT_FOUND") {
        return sendErrorResponse(res, "Result not found", 400);
      }
      return sendErrorResponse(res, "Error updating result", 400);
    }
  }
  static async deleteResult(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const results = await deleteResultServices(id as any);
      return sendSuccessResponse(
        res,
        "Result deleted successfully",
        results,
        201,
      );
    } catch (err: any) {
      if (err.message === "RESULT_NOT_FOUND") {
        return sendErrorResponse(res, "Result not found", 400);
      }
      return sendErrorResponse(res, "Error deleting result", 400);
    }
  }
}

export default ResultController;
