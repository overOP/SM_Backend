import express, { Router } from "express";
import AttendanceController from "../controllers/attendance.controller";
import catchAsync from "../utils/catchAsync";
import { Role } from "../enum/auth.enum";
import auth from "../middleware/authenticate.guard";

const router: Router = express.Router();

router.post(
  "/add-attendance",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(AttendanceController.addAttendance),
);
router.get("/", catchAsync(AttendanceController.getAllAttendance));

router.get("/:id", catchAsync(AttendanceController.getAttendanceById));
router.patch(
  "/update-attendance/:id",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(AttendanceController.updateAttendanceById),
);
router.delete(
  "/delete-attendance/:id",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(AttendanceController.deleteAttendance),
);
router.get(
  "/download-attendance/:id",
  catchAsync(AttendanceController.downloadAttendance),
);

export default router;
