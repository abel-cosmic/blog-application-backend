import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import AppError from "../../utils/error/app-error";

export const createUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new AppError("Error creating user", 500);
  }
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    throw new AppError("Error updating user", 500);
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new AppError("Error deleting user", 500);
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new AppError("Error retrieving users", 500);
  }
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error("User not found");
  }
  try {
    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw new AppError("Error retrieving user", 500);
  }
};
