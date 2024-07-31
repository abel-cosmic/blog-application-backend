import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./auth";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
export const hasRole = (role: Role) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ msg: "Access denied, insufficient permissions!" });
    }
    next();
  };
};
