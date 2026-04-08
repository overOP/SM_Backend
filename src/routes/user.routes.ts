import express, { Router } from "express";
import AuthController from "../controllers/user.controller";

const router: Router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/", AuthController.getAllUser);
router.get("/students", AuthController.getAllStudent);
router.get("/teachers", AuthController.getAllTeacher);
router.get("/parents", AuthController.getAllParents);
router.get("/totaluser", AuthController.totalCount);

router.get("/:id", AuthController.getUserById);
router.patch("/update-user/:id", AuthController.updateUserById);
router.patch("/change-password/:id", AuthController.updatePassword);
router.delete("/delete-user/:id", AuthController.deleteUser);

export default router;
