import express, { Router } from "express";
import EventController from "../controllers/event.controller";
import catchAsync from "../utils/catchAsync";
import auth from "../middleware/authenticate.guard";
import { Role } from "../enum/auth.enum";

const router: Router = express.Router();

router.post(
  "/add-event",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(EventController.addEvent),
);
router.get("/", catchAsync(EventController.getAllEvent));
router.get("/:id", catchAsync(EventController.getEventById));
router.patch(
  "/update-event/:id",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(EventController.updateEventById),
);
router.delete(
  "/delete-event/:id",
  auth.isAuthenticated,
  auth.restrictTo(Role.Principal, Role.Superadmin, Role.Teacher),
  catchAsync(EventController.deleteEvent),
);

export default router;
