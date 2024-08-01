import { Request, Response, NextFunction } from "express";
import AppError from "../utils/error/app-error";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...((err as any).errors && { errors: (err as any).errors }),
    });
  } else {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
