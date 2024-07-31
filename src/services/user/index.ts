// src/services/user/index.ts
import { User } from "@prisma/client";
import prisma from "../../config/prisma";

export const createUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
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
    throw new Error("Error updating user");
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Error retrieving users");
  }
};
