import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger";
import bodyParser from "body-parser";
import userRouter from "./api/user/user";
import blogRoutes from "./api/blog/blog";
import authRoutes from "./api/auth/auth";
import { errorHandler } from "./middleware/error-handler";
import path from "path";
import { authMiddleware } from "./middleware/auth";

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
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️Server is running at http://localhost:${port}`);
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", authMiddleware, blogRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
