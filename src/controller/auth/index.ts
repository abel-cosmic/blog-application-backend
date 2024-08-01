import { Request, Response } from "express";
import AppError from "../../utils/error/app-error";
import {
  forgotPasswordService,
  loginUserService,
  registerUserService,
  resetPasswordService,
} from "../../services/auth";
import { ForgotPasswordInput } from "../../types/auth";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const token = await registerUserService({ email, password, name, role });

    return res.status(201).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error registering user:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const token = await loginUserService({ email, password });

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error logging in user:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as ForgotPasswordInput;

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    await forgotPasswordService({ email });

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error in forgot password controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const resetPasswordController = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      throw new AppError("Token and new password are required", 400);
    }

    await resetPasswordService(token, newPassword);

    return res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ msg: error.message });
    }
    console.error("Error in reset password controller:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
