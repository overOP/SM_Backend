import express, { Router } from "express";
import AuthController from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";

const router: Router = express.Router();

router.post("/register", catchAsync(AuthController.registerUser));
router.post("/login", catchAsync(AuthController.loginUser));
router.get("/", catchAsync(AuthController.getAllUser));
router.get("/students", catchAsync(AuthController.getAllStudent));
router.get("/teachers", catchAsync(AuthController.getAllTeacher));
router.get("/parents", catchAsync(AuthController.getAllParents));
router.get("/totaluser", catchAsync(AuthController.totalCount));

router.get("/:id", catchAsync(AuthController.getUserById));
router.patch("/update-user/:id", catchAsync(AuthController.updateUserById));
router.patch("/change-password/:id", catchAsync(AuthController.updatePassword));
router.delete("/delete-user/:id", catchAsync(AuthController.deleteUser));

export default router;
