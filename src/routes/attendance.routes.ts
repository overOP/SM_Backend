import express, { Router } from "express";
import AttendanceController from "../controllers/attendance.controller";

const router: Router = express.Router();

router.post("/add-attendance", AttendanceController.addAttendance);
router.get("/", AttendanceController.getAllAttendance);

router.get("/:id", AttendanceController.getAttendanceById);
router.patch(
  "/update-attendance/:id",
  AttendanceController.updateAttendanceById,
);
router.delete("/delete-attendance/:id", AttendanceController.deleteAttendance);

export default router;
