import { Router } from "express";
import { TeacherController } from "../controllers/teacher.controller";

const router = Router();

router.post("/", TeacherController.createTeacher);
router.get("/", TeacherController.getAllTeachers);
router.get("/subject/:subjectid", TeacherController.getTeachersBySubject);
router.get("/:id", TeacherController.getTeacherById);
router.put("/:id", TeacherController.updateTeacher);
router.delete("/:id", TeacherController.deleteTeacher);

export default router;
