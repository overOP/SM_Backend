import { Request, Response } from "express";
import { registerUserService } from "../services/user.services";
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
}

export default AuthController;
