import Announcement from "../database/models/announcement.models";

export const addAnnouncementServices = async (
  announcementTitle: string,
  author: string,
  details: string,
  announcementDate: string,
  priority: string,
  targetAudience: string,
) => {
  const announcements = await Announcement.create({
    announcementTitle,
    author,
    details,
    announcementDate,
    priority,
    targetAudience,
  });

  return announcements;
};

export const getAllAnnouncementServices = async () => {
  const announcements = await Announcement.findAll();
  return announcements;
};
export const getAnnouncementByIdServices = async (id: string) => {
  const announcements = await Announcement.findByPk(id);
  return announcements;
};

export const updateAnnouncementByIdServices = async (id: string, data: any) => {
  const announcements = await Announcement.findByPk(id);
  if (!announcements) {
    throw new Error("ANNOUNCEMENT_NOT_FOUND");
  }

  announcements.set(data);
  announcements.save();
  return announcements;
};

export const deleteAnnouncementServices = async (id: string) => {
  const announcements = await Announcement.findByPk(id);
  if (!announcements) {
    throw new Error("ANNOUNCEMENT_NOT_FOUND");
  }

  announcements.destroy();
  return announcements;
};
