import express, { Router } from "express";
import FeeController from "../controllers/fee.controller";
import catchAsync from "../utils/catchAsync";
import auth from "../middleware/authenticate.guard";
import { Role } from "../enum/auth.enum";

const router: Router = express.Router();

router.get("/", catchAsync(FeeController.getAllFee));
router.get("/:id", catchAsync(FeeController.getFeeById));
router.patch(
  "/update-fee/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(FeeController.updateFeeById),
);
router.delete(
  "/delete-fee/:id",
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(FeeController.deleteFee),
);
router.get("/download/:id", catchAsync(FeeController.downloadFee));

export default router;
