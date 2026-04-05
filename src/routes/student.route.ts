import { Router } from "express";
import { StudentController } from "../controllers/student.controller";

const router = Router();

router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/class/:className", StudentController.getStudentsByClass);
router.get("/parent/:parentId", StudentController.getStudentsByParentId);
router.get("/:id", StudentController.getStudentById);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);

export default router;
