import Event from "../database/models/event.models";

export const addEventServices = async (
  eventTitle: string,
  category: string,
  description: string,
  eventDate: string,
  eventTime: string,
  location: string,
  targetAudience: string,
) => {
  const events = await Event.create({
    eventTitle,
    category,
    description,
    eventDate,
    eventTime,
    location,
    targetAudience,
  });

  return events;
};

export const getAllEventServices = async () => {
  const events = await Event.findAll();
  return events;
};
export const getEventByIdServices = async (id: string) => {
  const events = await Event.findByPk(id);
  return events;
};

export const updateEventByIdServices = async (id: string, data: any) => {
  const events = await Event.findByPk(id);
  if (!events) {
    throw new Error("EVENT_NOT_FOUND");
  }

  events.set(data);
  events.save();
  return events;
};

export const deleteEventServices = async (id: string) => {
  const events = await Event.findByPk(id);
  if (!events) {
    throw new Error("EVENT_NOT_FOUND");
  }

  events.destroy();
  return events;
};
