import express, { Router } from "express";
import AuthController from "../controllers/student.controller";

const router: Router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/", AuthController.getAllUser);

export default router;
