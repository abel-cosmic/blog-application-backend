import { Request, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
} from "../../services/event";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    await createEventService(eventData);
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create event",
    });
  }
};

export const getAllEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve events",
    });
  }
};

export const getEventByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await getEventByIdService(Number(id));
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event" });
  }
};

export const updateEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    await updateEventService(Number(id), eventData);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

export const deleteEventController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteEventService(Number(id));
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
