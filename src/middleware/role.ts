import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./auth";

export const roleMiddleware = (requiredRole: "ADMIN" | "USER") => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      return res
        .status(403)
        .json({ msg: "Access denied: insufficient permissions" });
    }
    next();
  };
};
