import express from "express";
import cors from "cors";
import userRouter from "../routes/user.route";
import studentRouter from "../routes/student.route";
import teacherRouter from "../routes/teacher.route";
import parentRouter from "../routes/parent.route";

export class App {
  public app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/api/users", userRouter);
    this.app.use("/api/students", studentRouter);
    this.app.use("/api/teachers", teacherRouter);
    this.app.use("/api/parents", parentRouter);
  }
}
