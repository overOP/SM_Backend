import { Request, Response } from "express";
import {
  deleteUserService,
  getAllParentService,
  getAllStudentService,
  getAllTeacherService,
  getAllUserService,
  getUserByIdService,
  loginService,
  registerUserService,
  totalCountSevice,
  updatePasswordService,
  updateUserByIdService,
} from "../services/user.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import { Role } from "../enum/auth.enum";
import { error } from "console";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password, phone, profileImage, role } = req.body;
      const result = await registerUserService(
        name,
        email,
        password,
        phone,
        profileImage,
        role,
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

  static async getAllStudent(req: Request, res: Response) {
    try {
      const user = await getAllStudentService();
      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getAllTeacher(req: Request, res: Response) {
    try {
      const user = await getAllTeacherService();
      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getAllParents(req: Request, res: Response) {
    try {
      const user = await getAllParentService();
      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const user = await getUserByIdService(id);
      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async updateUserById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const user = await updateUserByIdService(id, req.body);

      sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND") {
        sendErrorResponse(res, "User Not Found", 400);
      }
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async updatePassword(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const { password, newPassword } = req.body;
      console.log(newPassword, password);
      const user = await updatePasswordService(id, password, newPassword);

      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      if (err.message === "OLD_PASSWORD_DIDNOT_MATCH") {
        return sendErrorResponse(res, "Passowrd Didnot Match", 400);
      }
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const data = await deleteUserService(id);
      sendSuccessResponse(res, "Data Deleted", data, 200);
    } catch (err: any) {
      sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async totalCount(req: Request, res: Response) {
    try {
      const data = await totalCountSevice();
      sendSuccessResponse(res, "Total user", data, 200);
    } catch (err: any) {
      console.log(err.message);

      sendErrorResponse(res, "Error occured", 400);
    }
  }
}

export default AuthController;
