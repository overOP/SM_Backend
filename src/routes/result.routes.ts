import express, { Router } from "express";
import ResultController from "../controllers/result.controller";
import catchAsync from "../utils/catchAsync";

const router: Router = express.Router();

router.post("/add-result", catchAsync(ResultController.addResult));
router.get("/", catchAsync(ResultController.getAllResult));

router.get("/:id", catchAsync(ResultController.getResultById));
router.patch(
  "/update-result/:id",
  catchAsync(ResultController.updateResultById),
);
router.delete("/delete-result/:id", catchAsync(ResultController.deleteResult));

export default router;
