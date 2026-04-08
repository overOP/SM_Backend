import express, { Router } from "express";
import EventController from "../controllers/event.controller";
import catchAsync from "../utils/catchAsync";

const router: Router = express.Router();

router.post("/add-event", catchAsync(EventController.addEvent));
router.get("/", catchAsync(EventController.getAllEvent));

router.get("/:id", catchAsync(EventController.getEventById));
router.patch("/update-event/:id", catchAsync(EventController.updateEventById));
router.delete("/delete-event/:id", catchAsync(EventController.deleteEvent));

export default router;
