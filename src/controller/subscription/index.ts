import { Request, Response } from "express";
import AppError from "../../utils/error/app-error";
import {
  createSubscriptionService,
  getSubscriptionByEmailService,
  deleteSubscriptionService,
  getAllSubscriptionsService,
} from "../../services/subscription";
import { SubscriptionInput } from "../../types/subscription";

export const createSubscriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    await createSubscriptionService({ email });

    return res
      .status(201)
      .json({ message: "Subscription created successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error creating subscription:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getSubscriptionByEmailController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.params;

    if (!email) {
      throw new AppError("Email parameter is required", 400);
    }

    const subscription = await getSubscriptionByEmailService(email);

    return res.status(200).json(subscription);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error retrieving subscription:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const deleteSubscriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.params;

    if (!email) {
      throw new AppError("Email parameter is required", 400);
    }

    await deleteSubscriptionService(email);

    return res
      .status(200)
      .json({ message: "Subscription deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error deleting subscription:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getAllSubscriptionsController = async (
  req: Request,
  res: Response
) => {
  try {
    const subscriptions = await getAllSubscriptionsService();
    return res.status(200).json(subscriptions);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error retrieving subscriptions:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
