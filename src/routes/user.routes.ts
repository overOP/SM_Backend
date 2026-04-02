import express, { Router } from "express";
import AuthController from "../controllers/user.controller";

const router: Router = express.Router();

router.post("/register", AuthController.registerUser);

export default router;
