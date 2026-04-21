import { Request, Response } from "express";
import {
  deleteUserService,
  forgotPasswordService,
  getAllParentService,
  getAllStudentService,
  getAllTeacherService,
  getAllUserService,
  getAttendanceServices,
  getResultServices,
  getUserByIdService,
  loginService,
  registerStudentService,
  registerUserService,
  resetPasswordService,
  totalCountSevice,
  updatePasswordService,
  updateUserByIdService,
  verifyOtpService,
} from "../services/user.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import { checkRequiredFields } from "../utils/validateFields";

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
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getAllStudent(req: Request, res: Response) {
    try {
      const students = await getAllStudentService();
      return sendSuccessResponse(res, "Data fetched", students, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getAllTeacher(req: Request, res: Response) {
    try {
      const teachers = await getAllTeacherService();
      return sendSuccessResponse(res, "Data fetched", teachers, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getAllParents(req: Request, res: Response) {
    try {
      const parents = await getAllParentService();
      return sendSuccessResponse(res, "Data fetched", parents, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const user = await getUserByIdService(id);
      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async updateUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = req.body;

      if (req.file) {
        data.profileImage = req.file.filename;
      }

      const user = await updateUserByIdService(id as string, data);

      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      console.log(err.message);

      if (err.message === "USER_NOT_FOUND") {
        return sendErrorResponse(res, "User Not Found", 400);
      }
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    if (!checkRequiredFields(req.body, ["email"], res)) return;
    try {
      await forgotPasswordService(req.body.email);

      return sendSuccessResponse(res, "Check the email For the otp", {}, 200);
    } catch (err: any) {
      if (err.message === "OTP_COOLDOWN") {
        return sendErrorResponse(res, "Please wait before retrying", 429);
      }
      if (err.message === "OTP_LIMIT") {
        return sendErrorResponse(res, "OTP limit reached", 429);
      }
      if (err.message === "USER_NOT_FOUND") {
        return sendErrorResponse(res, "User not found", 400);
      }
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    if (!checkRequiredFields(req.body, ["email"], res)) return;
    try {
      const user = await verifyOtpService(req.body.email, req.body.otp);

      return sendSuccessResponse(res, "Check the email For the otp", user, 200);
    } catch (err: any) {
      if (err.message === "USER_NOT_FOUND") {
        return sendErrorResponse(res, "User not found", 400);
      }
      if (err.message === "NO_OTP_REQUESTED") {
        return sendErrorResponse(
          res,
          "No OTP requested. Please request an OTP first.",
          400,
        );
      }

      if (err.message === "OTP_EXPIRED") {
        return sendErrorResponse(
          res,
          "OTP has expired. Please request a new OTP.",
          400,
        );
      }

      if (err.message === "OTP_ATTEMPTS_EXCEEDED") {
        return sendErrorResponse(
          res,
          "Too many failed attempts. Please request a new OTP.",
          429,
        );
      }

      if (err.message.startsWith("OTP_INVALID")) {
        const attemptsLeft = err.message.split(":")[1];
        console.log(attemptsLeft);
        return sendErrorResponse(
          res,
          `Invalid OTP. Attempts left: ${attemptsLeft}`,
          401,
        );
      }
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async resetPasswords(req: Request, res: Response) {
    if (
      !checkRequiredFields(
        req.body,
        ["resetToken", "newPassword", "confirmPassword"],
        res,
      )
    ) {
      return;
    }

    const { resetToken, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return sendErrorResponse(
        res,
        "New password and confirm password do not match",
        400,
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return sendErrorResponse(
        res,
        "Password must be at least 6 characters long",
        400,
      );
    }

    try {
      await resetPasswordService(resetToken, newPassword);
      return sendSuccessResponse(res, "Password reset successful", {}, 200);
    } catch (err: any) {
      if (err.message === "INVALID_TOKEN") {
        return sendErrorResponse(res, "Invalid or expired reset token", 401);
      }

      if (err.message === "USER_NOT_FOUND") {
        return sendErrorResponse(res, "User not found", 404);
      }

      return sendErrorResponse(res, "Failed to reset password", 500);
    }
  }

  static async updatePassword(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const { password, newPassword } = req.body;
      const user = await updatePasswordService(id, password, newPassword);

      return sendSuccessResponse(res, "Data fetched", user, 200);
    } catch (err: any) {
      if (err.message === "OLD_PASSWORD_DIDNOT_MATCH") {
        return sendErrorResponse(res, "Passowrd Didnot Match", 400);
      }
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;
      const data = await deleteUserService(id);
      return sendSuccessResponse(res, "Data Deleted", data, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async totalCount(req: Request, res: Response) {
    try {
      const data = await totalCountSevice();
      return sendSuccessResponse(res, "Total user", data, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getAttendance(req: Request, res: Response) {
    try {
      let studentId: any;
      studentId = req.params.id;
      const students = await getAttendanceServices(studentId);
      return sendSuccessResponse(res, "Data fetched", students, 200);
    } catch (err: any) {
      console.log(err.message);
      return sendErrorResponse(res, err.message, 400);
    }
  }
  static async getResult(req: Request, res: Response) {
    try {
      let studentId: any;
      studentId = req.params.id;
      const students = await getResultServices(studentId);
      return sendSuccessResponse(res, "Data fetched", students, 200);
    } catch (err: any) {
      console.log(err.message);
      return sendErrorResponse(res, err.message, 400);
    }
  }
}

export default AuthController;
