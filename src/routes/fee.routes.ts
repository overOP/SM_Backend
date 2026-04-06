import express, { Router } from "express";
import FeeController from "../controllers/fee.controller";

const router: Router = express.Router();

router.post("/add-fee", FeeController.addFee);
router.get("/", FeeController.getAllFee);

router.get("/:id", FeeController.getFeeById);
router.patch("/update-fee/:id", FeeController.updateFeeById);
router.delete("/delete-fee/:id", FeeController.deleteFee);

export default router;
