import express, { Router } from "express";
import ResultController from "../controllers/result.controller";

const router: Router = express.Router();

router.post("/add-result", ResultController.addResult);
router.get("/", ResultController.getAllResult);

router.get("/:id", ResultController.getResultById);
router.patch("/update-result/:id", ResultController.updateResultById);
router.delete("/delete-result/:id", ResultController.deleteResult);

export default router;
