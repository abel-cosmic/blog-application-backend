import { Subscription } from "@prisma/client";
import prisma from "../../config/prisma";
import { SubscriptionInput } from "../../types/subscription";
import AppError from "../../utils/error/app-error";
import { sendEmail } from "../../utils/email";
import { getRegistrationTemplate } from "../../utils/html-templates";

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
  const emailContent = getRegistrationTemplate({
    name: email,
    year: new Date().getFullYear(),
  });

  await sendEmail(email, "Welcome to Our Blog", emailContent);
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
