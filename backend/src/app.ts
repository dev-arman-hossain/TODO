import express, { Request, Response } from "express";

import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.routes";
import { todoRouter } from "./modules/todo/todo.routes";
import { authRouter } from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// initialize database
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello, bro! whats up?");
});

// users CRUD
app.use("/users", userRouter);

// todos CRUD
app.use("/todos", todoRouter);

//auth routes
app.use("/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
