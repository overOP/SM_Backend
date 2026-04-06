import express from "express";
import cors from "cors";
import user from "../routes/user.routes";
import event from "../routes/event.routes";
import result from "../routes/result.routes";
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
    this.app.use("/api/users", user);
    this.app.use("/api/events", event);
    this.app.use("/api/results", result);
  }
}
