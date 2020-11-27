import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { CustomError } from "./../errors/customErrors";
import { pick } from "lodash";

export const handleError: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  
  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? pick(error, ['message', 'code', 'status', 'data'])  as CustomError
    : {
        message: 'Something went wrong',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };
  
  res.status(clientError.status).send({ error: clientError });
}