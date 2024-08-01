import { Request, Response } from "express";
import AppError from "../../utils/error/app-error";
import {
  createRegistrationService,
  getRegistrationByIdService,
  getAllRegistrationsService,
  updateRegistrationService,
  deleteRegistrationService,
  getRegistrationByUserIdAndEventIdService,
} from "../../services/registration";
import { RegistrationInput } from "../../types/registration";

export const createRegistrationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, eventId } = req.body as RegistrationInput;

    if (!userId || !eventId) {
      throw new AppError("User ID and Event ID are required", 400);
    }

    await createRegistrationService(userId, eventId);

    return res
      .status(201)
      .json({ message: "Registration created successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error creating registration:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getRegistrationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Registration ID is required", 400);
    }

    const registration = await getRegistrationByIdService(Number(id));

    if (!registration) {
      throw new AppError("Registration not found", 404);
    }

    return res.status(200).json(registration);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error retrieving registration:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getAllRegistrationsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const registrations = await getAllRegistrationsService();
    return res.status(200).json(registrations);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error retrieving registrations:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const updateRegistrationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { userId, eventId } = req.body as RegistrationInput;

    if (!id) {
      throw new AppError("Registration ID is required", 400);
    }

    const registration = await updateRegistrationService(
      Number(id),
      userId,
      eventId
    );

    if (!registration) {
      throw new AppError("Registration not found", 404);
    }

    return res
      .status(200)
      .json({ message: "Registration updated successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error updating registration:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const deleteRegistrationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Registration ID is required", 400);
    }

    await deleteRegistrationService(Number(id));

    return res
      .status(200)
      .json({ message: "Registration deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error deleting registration:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
export const getRegistrationByUserIdAndEventIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, eventId } = req.params;

    if (!userId || !eventId) {
      throw new AppError("User ID and Event ID are required", 400);
    }

    const registration = await getRegistrationByUserIdAndEventIdService(
      parseInt(userId, 10),
      parseInt(eventId, 10)
    );

    if (!registration) {
      throw new AppError("Registration not found", 404);
    }

    return res.status(200).json(registration);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error retrieving registration:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
