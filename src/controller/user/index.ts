import { Request, Response } from "express";
import AppError from "../../utils/error/app-error"; // Ensure correct import
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../services/user";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error in createUserController:", error);
    throw new AppError("Error creating user", 500);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id); // Ensure ID is a number
    const user = await updateUser(userId, req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateUserController:", error);
    throw new AppError("Error updating user", 500);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.id); // Ensure ID is a number
    const user = await deleteUser(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    throw new AppError("Error deleting user", 500);
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Error retrieving users");
  }
};
