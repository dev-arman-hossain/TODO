// higher order function
import Jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import config from "../config";

export const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = Jwt.verify(token, config.jwt_secret as string);
    console.log({ decoded });
    next();
  };
};
