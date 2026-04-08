import express, { Router } from "express";
import FeeController from "../controllers/fee.controller";
import catchAsync from "../utils/catchAsync";

const router: Router = express.Router();

router.get("/", catchAsync(FeeController.getAllFee));

router.get("/:id", catchAsync(FeeController.getFeeById));
router.patch("/update-fee/:id", catchAsync(FeeController.updateFeeById));
router.delete("/delete-fee/:id", catchAsync(FeeController.deleteFee));

export default router;
