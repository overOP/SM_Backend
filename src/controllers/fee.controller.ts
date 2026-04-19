import { Request, Response } from "express";
import {
  deleteFeeServices,
  downloadFeeService,
  getAllFeeServices,
  getFeeByIdServices,
  updateFeeByIdServices,
} from "../services/fee.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class FeeController {
  static async getAllFee(req: Request, res: Response) {
    try {
      const fees = await getAllFeeServices();
      return sendSuccessResponse(res, "Fee fetched successfully", fees, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching fee", 400);
    }
  }

  static async getFeeById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const fees = await getFeeByIdServices(id as any);
      return sendSuccessResponse(res, "Fee fetched successfully", fees, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching fee", 400);
    }
  }

  static async updateFeeById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let { paidAmount } = req.body;
      const fees = await updateFeeByIdServices(id as any, paidAmount);
      return sendSuccessResponse(res, "Fee updated successfully", fees, 201);
    } catch (err: any) {
      if (err.message === "FEE_NOT_FOUND") {
        return sendErrorResponse(res, "Fee not found", 400);
      }
      return sendErrorResponse(res, "Error updating fee", 400);
    }
  }
  static async deleteFee(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const fees = await deleteFeeServices(id as any);
      return sendSuccessResponse(res, "Fee deleted successfully", fees, 201);
    } catch (err: any) {
      if (err.message === "FEE_NOT_FOUND") {
        return sendErrorResponse(res, "Fee not found", 400);
      }
      return sendErrorResponse(res, "Error deleting fee", 400);
    }
  }

  static async downloadFee(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const pdfBuffer = await downloadFeeService(id as any);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-Disposition", `attachment;filename=feeReport.pdf`);
      return res.send(pdfBuffer);
    } catch (err: any) {
      console.log(err.message);
      if (err.message === "FEE_NOT_FOUND") {
        return sendErrorResponse(res, "Fee not found", 400);
      }
      return sendErrorResponse(res, "Error Occured", 400);
    }
  }
}

export default FeeController;
