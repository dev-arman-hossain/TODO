import { NextFunction, Request, Response } from "express";

// logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
};

export default logger;
