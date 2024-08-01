import { Subscription } from "@prisma/client";
import prisma from "../../config/prisma";
import { SubscriptionInput } from "../../types/subscription";
import AppError from "../../utils/error/app-error";

export const createSubscriptionService = async (
  data: SubscriptionInput
): Promise<void> => {
  const { email } = data;
  const existingSubscription = await prisma.subscription.findUnique({
    where: { email },
  });
  if (existingSubscription) {
    throw new AppError("Subscription already exists", 400);
  }
  await prisma.subscription.create({
    data: {
      email,
    },
  });
};

export const getSubscriptionByEmailService = async (
  email: string
): Promise<Subscription | null> => {
  const subscription = await prisma.subscription.findUnique({
    where: { email },
  });

  if (!subscription) {
    throw new AppError("Subscription not found", 404);
  }

  return subscription;
};
export const deleteSubscriptionService = async (
  email: string
): Promise<void> => {
  const subscription = await prisma.subscription.findUnique({
    where: { email },
  });

  if (!subscription) {
    throw new AppError("Subscription not found", 404);
  }

  await prisma.subscription.delete({
    where: { email },
  });
};

export const getAllSubscriptionsService = async (): Promise<Subscription[]> => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return subscriptions;
  } catch (error) {
    throw new AppError("Error retrieving subscriptions", 500);
  }
};
