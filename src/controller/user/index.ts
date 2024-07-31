import { Request, Response } from "express";
import AppError, { NotFoundError } from "../../utils/error/app-error";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
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
    const userId = Number(req.params.id);
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
    const userId = Number(req.params.id);
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

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      throw new NotFoundError(`User with id: ${req.params.id} not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};
