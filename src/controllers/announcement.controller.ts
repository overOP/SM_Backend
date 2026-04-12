import { Request, Response } from "express";
import {
  addAnnouncementServices,
  deleteAnnouncementServices,
  getAllAnnouncementServices,
  getAnnouncementByIdServices,
  updateAnnouncementByIdServices,
} from "../services/announcement.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class AnnouncementController {
  static async addAnnouncement(req: Request, res: Response) {
    try {
      const {
        announcementTitle,
        author,
        details,
        announcementDate,
        priority,
        targetAudience,
      } = req.body;

      const announcements = await addAnnouncementServices(
        announcementTitle,
        author,
        details,
        announcementDate,
        priority,
        targetAudience,
      );
      return sendSuccessResponse(
        res,
        "Announcement added successfully",
        announcements,
        201,
      );
    } catch (err: any) {
      console.log("ADD ANNOUNCEMENT ERROR:", err);
      return sendErrorResponse(res, "Error adding announcement", 400);
    }
  }

  static async getAllAnnouncement(req: Request, res: Response) {
    try {
      const announcements = await getAllAnnouncementServices();
      return sendSuccessResponse(
        res,
        "Announcement fetched successfully",
        announcements,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching announcement", 400);
    }
  }

  static async getAnnouncementById(req: Request, res: Response) {
    try {
      let id: any;
      id = req.params.id;

      const announcements = await getAnnouncementByIdServices(id);
      return sendSuccessResponse(
        res,
        "Announcement fetched successfully",
        announcements,
        200,
      );
    } catch (err: any) {
      return sendErrorResponse(res, "Error fetching announcement", 400);
    }
  }

  static async updateAnnouncementById(req: Request, res: Response) {
    try {
      let id = req.params.id;
      let data = req.body;
      const announcements = await updateAnnouncementByIdServices(
        id as any,
        data,
      );
      return sendSuccessResponse(
        res,
        "Announcement updated successfully",
        announcements,
        201,
      );
    } catch (err: any) {
      if (err.message === "ANNOUNCEMENT_NOT_FOUND") {
        return sendErrorResponse(res, "Announcement not found", 400);
      }
      return sendErrorResponse(res, "Error updating announcement", 400);
    }
  }
  static async deleteAnnouncement(req: Request, res: Response) {
    try {
      let id = req.params.id;
      const announcements = await deleteAnnouncementServices(id as any);
      return sendSuccessResponse(
        res,
        "Announcement deleted successfully",
        announcements,
        201,
      );
    } catch (err: any) {
      if (err.message === "ANNOUNCEMENT_NOT_FOUND") {
        return sendErrorResponse(res, "Announcement not found", 400);
      }
      return sendErrorResponse(res, "Error deleting announcement", 400);
    }
  }
}

export default AnnouncementController;
