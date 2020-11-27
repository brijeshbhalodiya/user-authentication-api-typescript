import { RequestHandler, Request, Response, NextFunction } from "express";

export default (requestHandler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
      return requestHandler(req, res, next);
    }catch(err){
      next(err)
    }
  }
}