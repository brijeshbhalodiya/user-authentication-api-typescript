import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { CustomError } from "./../errors/customErrors";
import { pick } from "lodash";

export const handleError: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  
  return res.status(error.status || 500).send({ error });
}