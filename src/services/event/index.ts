import { Event, PrismaClient } from "@prisma/client";
import AppError from "../../utils/error/app-error";

const prisma = new PrismaClient();

export const createEventService = async (data: {
  title: string;
  description: string;
  location: string;
  date: Date;
}): Promise<Event> => {
  try {
    const event = await prisma.event.create({
      data,
    });
    return event;
  } catch (error) {
    throw new AppError("Error creating event", 500);
  }
};

export const getAllEventsService = async (): Promise<Event[]> => {
  try {
    const events = await prisma.event.findMany();
    return events;
  } catch (error) {
    throw new AppError("Error retrieving events", 500);
  }
};

export const getEventByIdService = async (
  id: number
): Promise<Event | null> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      throw new AppError("Event not found", 404);
    }
    return event;
  } catch (error) {
    throw new AppError("Error retrieving event", 500);
  }
};

export const updateEventService = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    location?: string;
    date?: Date;
  }
): Promise<Event> => {
  try {
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    return event;
  } catch (error) {
    throw new AppError("Error updating event", 500);
  }
};

export const deleteEventService = async (id: number): Promise<void> => {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    throw new AppError("Error deleting event", 500);
  }
};
