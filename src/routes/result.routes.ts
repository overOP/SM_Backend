import express, { Router } from "express";
import ResultController from "../controllers/result.controller";
import catchAsync from "../utils/catchAsync";
import { Role } from "../enum/auth.enum";
import auth from "../middleware/authenticate.guard";

const router: Router = express.Router();

router.post(
  "/add-result",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(ResultController.addResult),
);
router.get("/", catchAsync(ResultController.getAllResult));

router.get("/:id", catchAsync(ResultController.getResultById));
router.patch(
  "/update-result/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),

  catchAsync(ResultController.updateResultById),
);
router.delete(
  "/delete-result/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(ResultController.deleteResult),
);
router.get(
  "/download-result/:id",
  catchAsync(ResultController.downloadsResult),
);

export default router;
