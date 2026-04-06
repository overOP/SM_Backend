import express, { Router } from "express";
import EventController from "../controllers/event.controller";

const router: Router = express.Router();

router.post("/add-event", EventController.addEvent);
router.get("/", EventController.getAllEvent);

router.get("/:id", EventController.getEventById);
router.patch("/update-event/:id", EventController.updateEventById);
router.delete("/delete-event/:id", EventController.deleteEvent);

export default router;
