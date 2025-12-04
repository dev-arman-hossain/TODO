import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authServices.loginUser(email, password);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
    // console.log(result.rows[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const authController = {
  loginUser,
};
