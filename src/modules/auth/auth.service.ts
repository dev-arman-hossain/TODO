import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const token = Jwt.sign(
    { name: user.name, email: user.email },
    config.jwt_secret as string,
    {
      expiresIn: "1h",
    }
  );

  console.log(token);
  return { user, token };
};

export const authServices = {
  loginUser,
};
