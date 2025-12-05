import express from "express";
import { userController } from "./user.controller";
import logger from "../../middleware/logger";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post("/", userController.createUser);

router.get("/", logger, auth("admin", "user"), userController.getUser);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deletUser);

export const userRouter = router;
