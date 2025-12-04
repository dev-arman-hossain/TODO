import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  const secret = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const token = Jwt.sign({ name: user.name, email: user.email }, secret, {
    expiresIn: "1h",
  });

  console.log(token);
  return { user, token };
};

export const authServices = {
  loginUser,
};
