import express, { Router } from "express";
import AttendanceController from "../controllers/attendance.controller";
import catchAsync from "../utils/catchAsync";

const router: Router = express.Router();

router.post("/add-attendance", catchAsync(AttendanceController.addAttendance));
router.get("/", catchAsync(AttendanceController.getAllAttendance));

router.get("/:id", catchAsync(AttendanceController.getAttendanceById));
router.patch(
  "/update-attendance/:id",
  catchAsync(AttendanceController.updateAttendanceById),
);
router.delete(
  "/delete-attendance/:id",
  catchAsync(AttendanceController.deleteAttendance),
);
router.get(
  "/download-attendance/:id",
  catchAsync(AttendanceController.downloadAttendance),
);

export default router;
