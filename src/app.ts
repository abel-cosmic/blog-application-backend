import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`⚡️Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
