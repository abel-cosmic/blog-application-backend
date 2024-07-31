import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    const supabaseSecret: string = process.env.SUPABASE_JWT_SECRET as string;

    if (!token) {
      return res.status(401).json({ msg: "No token, auth denied!" });
    }

    const decoded = jwt.verify(token, supabaseSecret) as JwtPayload;

    if (!decoded) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, auth denied!" });
    }

    // Assuming the decoded token contains user role information
    if (decoded.role !== "admin" && decoded.role !== "user") {
      return res
        .status(403)
        .json({ msg: "Access denied, insufficient permissions!" });
    }

    // Attach the decoded token to the request object
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid token, auth denied!" });
  }
};
