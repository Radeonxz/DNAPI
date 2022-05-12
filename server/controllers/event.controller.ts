import { EventModel } from "../models/models.ts";

const createEvent = async (eventObj: any) => {
  const eventId = crypto.randomUUID();
  const createdAt = new Date();
  await EventModel.insertOne({ ...eventObj, eventId, createdAt });
  return eventId;
};

const updateEventById = async (eventId: string, eventObj: any) => {
  const updatedAt = new Date();
  const updatedUser = await EventModel.updateOne(
    { eventId },
    { $set: { ...eventObj, updatedAt } }
  );
  return updatedUser;
};

const getAllEventsByAppId = async (appId: string) => {
  const events = await EventModel.find({ appId }).toArray();
  return events;
};

const findEventById = async (eventId: string) => {
  const event = await EventModel.findOne({ eventId });
  return event;
};

const deleteEventById = async (eventId: string) => {
  const deleteCount = await EventModel.deleteOne({ eventId });
  return deleteCount;
};

export {
  createEvent,
  updateEventById,
  getAllEventsByAppId,
  findEventById,
  deleteEventById
};
