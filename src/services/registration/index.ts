import { PrismaClient, Registration } from "@prisma/client";
import AppError from "../../utils/error/app-error";

const prisma = new PrismaClient();

export const createRegistrationService = async (
  userId: number,
  eventId: number
): Promise<Registration> => {
  try {
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });
    return registration;
  } catch (error) {
    throw new AppError("Error creating registration", 500);
  }
};

export const getRegistrationByIdService = async (
  id: number
): Promise<Registration | null> => {
  const registration = await prisma.registration.findUnique({
    where: { id },
  });

  if (!registration) {
    throw new AppError("Registration not found", 404);
  }

  return registration;
};

export const getAllRegistrationsService = async (): Promise<Registration[]> => {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: true,
        event: true,
      },
    });
    return registrations;
  } catch (error) {
    throw new AppError("Error retrieving registrations", 500);
  }
};

export const updateRegistrationService = async (
  id: number,
  userId?: number,
  eventId?: number
): Promise<Registration> => {
  try {
    const registration = await prisma.registration.update({
      where: { id },
      data: {
        userId,
        eventId,
      },
    });
    return registration;
  } catch (error) {
    throw new AppError("Error updating registration", 500);
  }
};

export const deleteRegistrationService = async (id: number): Promise<void> => {
  const registration = await prisma.registration.findUnique({
    where: { id },
  });

  if (!registration) {
    throw new AppError("Registration not found", 404);
  }

  await prisma.registration.delete({
    where: { id },
  });
};

export const getRegistrationByUserIdAndEventIdService = async (
  userId: number,
  eventId: number
) => {
  try {
    const registration = await prisma.registration.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (!registration) {
      throw new Error("Registration not found");
    }

    return registration;
  } catch (error) {
    console.error("Error retrieving registration:", error);
    throw error;
  }
};
