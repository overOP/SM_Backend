import express, { Router } from "express";
import SubjectController from "../controllers/subject.controller";
import catchAsync from "../utils/catchAsync";
import auth from "../middleware/authenticate.guard";
import { Role } from "../enum/auth.enum";

const router: Router = express.Router();

router.post(
  "/add-subject",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(SubjectController.addSubject),
);
router.get("/", catchAsync(SubjectController.getAllSubject));
router.get("/:id", catchAsync(SubjectController.getSubjectById));
router.patch(
  "/update-subject/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(SubjectController.updateSubjectById),
);
router.delete(
  "/delete-subject/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(SubjectController.deleteSubject),
);

export default router;
