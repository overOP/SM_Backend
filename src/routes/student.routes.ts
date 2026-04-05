import express, { Router } from "express";
import AuthController from "../controllers/student.controller";

const router: Router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/", AuthController.getAllUser);

router.get("/:id", AuthController.getUserById);
router.patch("/update-user/:id", AuthController.updateUserById);
router.patch("/change-password/:id", AuthController.updatePassword);
router.delete("/delete-user/:id", AuthController.deleteUser);

export default router;
