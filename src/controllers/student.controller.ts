import { Request, Response } from "express";
import {
  getAllUserService,
  loginService,
  registerUserService,
} from "../services/student.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, phone, profileImage } = req.body;
      const result = await registerUserService(
        name,
        email,
        password,
        phone,
        profileImage,
      );

      return sendSuccessResponse(
        res,
        "User registration was sucessfull",
        result,
        200,
      );
    } catch (err: any) {
      if (err.message === "EMAIL_EXIST!") {
        sendErrorResponse(res, "User exist with this email", 400);
      }
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await loginService(email, password);
      sendSuccessResponse(res, "Login Sucessfull", user, 200);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND" || "INVALID_CREDENTIALS") {
        sendErrorResponse(res, "Invalid credentials", 400);
      }
      sendErrorResponse(res, "Error occured while logging In", 400);
    }
  }

  static async getAllUser(req: Request, res: Response) {
    try {
      const user = await getAllUserService();
      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }
}

export default AuthController;
