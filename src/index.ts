import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 8000;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send("Hello World");
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))

