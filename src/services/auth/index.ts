import prisma from "../../config/prisma";
import {
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
} from "../../types/auth";
import AppError from "../../utils/error/app-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  getPasswordResetTemplate,
  getRegistrationTemplate,
} from "../../utils/html-templates";
import { sendEmail } from "../../utils/email";

export const registerUserService = async (
  data: RegisterUserInput
): Promise<string> => {
  const { email, password, name, role } = data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });

  const emailContent = getRegistrationTemplate({
    name: user.name || user.email,
    year: new Date().getFullYear(),
  });

  await sendEmail(user.email, "Welcome to Our Blog", emailContent);

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SUPABASE_JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return token;
};

export const loginUserService = async (
  data: LoginUserInput
): Promise<string> => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.SUPABASE_JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return token;
};

export const forgotPasswordService = async (
  data: ForgotPasswordInput
): Promise<void> => {
  const { email } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const expiresIn = process.env.PASSWORD_RESET_EXPIRES || "1h";
  const resetToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SUPABASE_JWT_SECRET!,
    { expiresIn: expiresIn }
  );
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const emailContent = getPasswordResetTemplate({
    name: user.name || user.email,
    year: new Date().getFullYear(),
    resetLink,
  });

  await sendEmail(user.email, "Password Reset Request", emailContent);
};

export const resetPasswordService = async (
  token: string,
  newPassword: string
): Promise<void> => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET!
    ) as jwt.JwtPayload;
    const userId = decoded.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid or expired token", 400);
    }
    throw new AppError("An error occurred while resetting the password", 500);
  }
};
