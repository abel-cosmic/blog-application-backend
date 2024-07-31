import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger";
import bodyParser from "body-parser";
import AppError from "./utils/error/app-error";
import errorHandler from "./middleware/error-handler";
import userRouter from "./api/user/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Initialize Swagger
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*", credentials: true }));

// Catch-all handler for unhandled routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Route not found", 404)); // Pass error to the next middleware
});
// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️Server is running at http://localhost:${port}`);
});
app.use("/api", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
