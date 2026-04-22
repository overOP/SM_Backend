import express, { Router } from "express";
import AuthController from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";
import multer from "multer";
import { storage } from "../middleware/multer.guard";
import auth from "../middleware/authenticate.guard";
import { Role } from "../enum/auth.enum";

const upload = multer({ storage });

const router: Router = express.Router();

router.post(
  "/register",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.registerUser),
);
router.post(
  "/create-student/students",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  AuthController.registerStudent,
);
router.post("/login", catchAsync(AuthController.loginUser));
router.post("/forgot-password", catchAsync(AuthController.forgotPassword));
router.post("/verify-otp", catchAsync(AuthController.verifyOtp));
router.get(
  "/",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.getAllUser),
);
router.get(
  "/result/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(AuthController.getResult),
);
router.get(
  "/attendance/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(AuthController.getAttendance),
);

router.get(
  "/students",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.getAllStudent),
);
router.get(
  "/teachers",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.getAllTeacher),
);
router.get(
  "/parents",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.getAllParents),
);
router.get(
  "/totaluser",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.totalCount),
);
router.get("/:id", catchAsync(AuthController.getUserById));
router.patch(
  "/update-user/:id",
  upload.single("profileImage"),
  catchAsync(AuthController.updateUserById),
);
router.patch("/reset-password", catchAsync(AuthController.resetPasswords));
router.patch("/change-password/:id", catchAsync(AuthController.updatePassword));
router.delete(
  "/delete-user/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin),
  catchAsync(AuthController.deleteUser),
);

export default router;
