import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../types/middleware";

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    const secret: string = process.env.SUPABASE_JWT_SECRET as string;

    if (!token) {
      return res.status(401).json({ msg: "No token, auth denied!" });
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & {
      role: "ADMIN" | "USER";
    };

    if (!decoded) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied!" });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token, auth denied!" });
  }
};
