import { Request, Response } from "express";
import {
  deleteUserService,
  getAllParentService,
  getAllStudentService,
  getAllTeacherService,
  getAllUserService,
  getUserByIdService,
  loginService,
  registerStudentService,
  registerUserService,
  totalCountSevice,
  updatePasswordService,
  updateUserByIdService,
} from "../services/user.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

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
        return sendErrorResponse(res, "User exist with this email", 400);
      }
    }
  }

  static async registerStudent(req: Request, res: Response) {
    try {
      const {
        profileImage,
        name,
        email,
        password,
        phoneNumber,
        guardianName,
        classGrade,
        rollNumber,
        section,
        totalAmount,
        paidAmount,
        role,
      } = req.body;

      const result = await registerStudentService(
        profileImage,
        name,
        email,
        password,
        phoneNumber,
        guardianName,
        classGrade,
        rollNumber,
        section,
        totalAmount,
        paidAmount,
        role,
      );

      return sendSuccessResponse(
        res,
        "User registration was sucessfull",
        result,
        200,
      );
    } catch (err: any) {
      console.log(err.message);
      if (err.message === "EMAIL_EXIST!") {
        return sendErrorResponse(res, "User exist with this email", 400);
      }
      return sendErrorResponse(res, "Internal server error", 500);
    }
  }
  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await loginService(email, password);
      return sendSuccessResponse(res, "Login Sucessfull", user, 200);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND" || "INVALID_CREDENTIALS") {
        return sendErrorResponse(res, "Invalid credentials", 400);
      }
      return sendErrorResponse(res, "Error occured while logging In", 400);
    }
  }

  static async getAllUser(req: Request, res: Response) {
    try {
      const users = await getAllUserService();
      return sendSuccessResponse(res, "Data fetched", users, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getAllStudent(req: Request, res: Response) {
    try {
      const students = await getAllStudentService();
      return sendSuccessResponse(res, "Data fetched", students, 200);
    } catch (err: any) {
      console.log(err.message);
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getAllTeacher(req: Request, res: Response) {
    try {
      const teachers = await getAllTeacherService();
      return sendSuccessResponse(res, "Data fetched", teachers, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getAllParents(req: Request, res: Response) {
    try {
      const parents = await getAllParentService();
      return sendSuccessResponse(res, "Data fetched", parents, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const user = await getUserByIdService(id);
      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async updateUserById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const user = await updateUserByIdService(id, req.body);

      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND") {
        return sendErrorResponse(res, "User Not Found", 400);
      }
      return sendErrorResponse(res, "Error occured", 400);
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
      return sendSuccessResponse(res, "Data Deleted", data, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error occured", 400);
    }
  }

  static async totalCount(req: Request, res: Response) {
    try {
      const data = await totalCountSevice();
      return sendSuccessResponse(res, "Total user", data, 200);
    } catch (err: any) {
      console.log(err.message);

      return sendErrorResponse(res, "Error occured", 400);
    }
  }
}

export default AuthController;
