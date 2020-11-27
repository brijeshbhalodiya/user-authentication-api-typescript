import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { handleError } from "./middlerware/handleError";

import Routes from "./routes";
import { RouteNotFoundError } from "./errors/customErrors";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 8000;
const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/user_auth"

app.disable("x-powered-by")
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", Routes);

app.use((req: Request, res: Response, next: NextFunction) => next(new RouteNotFoundError(req.originalUrl)));
app.use(handleError);

mongoose.connect(MONGO_URI, { useUnifiedTopology: true })
.then(() => {
  console.log(`MongoDB connected`);
  app.listen(PORT, () => console.log(`Server running on ${PORT}`))
})
.catch((error) => {
  throw error
})
