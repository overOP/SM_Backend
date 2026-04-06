import { Request, Response } from "express";
import {
  addEventServices,
  deleteEventServices,
  getAllEventServices,
  getEventByIdServices,
  updateEventByIdServices,
} from "../services/event.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class EventController {
  static async addEvent(req: Request, res: Response) {
    try {
      const {
        eventTitle,
        category,
        description,
        eventDate,
        eventTime,
        location,
        targetAudience,
      } = req.body;

      const events = await addEventServices(
        eventTitle,
        category,
        description,
        eventDate,
        eventTime,
        location,
        targetAudience,
      );
      return sendSuccessResponse(res, "Event added successfully", events, 201);
    } catch (err: any) {
      console.log("ADD EVENT ERROR:", err);
      return sendErrorResponse(res, "Error adding event", 400);
    }
  }

  static async getAllEvent(req: Request, res: Response) {
    try {
      const events = await getAllEventServices();
      return sendSuccessResponse(
        res,
        "Event fetched successfully",
        events,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching event", 400);
    }
  }

  static async getEventById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;

      const events = await getEventByIdServices(id);
      return sendSuccessResponse(
        res,
        "Event fetched successfully",
        events,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching event", 400);
    }
  }

  static async updateEventById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = req.body;
      const events = await updateEventByIdServices(id as any, data);
      return sendSuccessResponse(
        res,
        "Event updated successfully",
        events,
        201,
      );
    } catch (err: any) {
      if (err.message === "EVENT_NOT_FOUND") {
        return sendErrorResponse(res, "Event not found", 400);
      }
      return sendErrorResponse(res, "Error updating event", 400);
    }
  }
  static async deleteEvent(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const events = await deleteEventServices(id as any);
      return sendSuccessResponse(
        res,
        "Event deleted successfully",
        events,
        201,
      );
    } catch (err: any) {
      if (err.message === "EVENT_NOT_FOUND") {
        return sendErrorResponse(res, "Event not found", 400);
      }
      return sendErrorResponse(res, "Error deleting event", 400);
    }
  }
}

export default EventController;
