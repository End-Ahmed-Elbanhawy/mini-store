import jwt from "jsonwebtoken";
import { AppError } from "./app-error.mjs";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET is missing from .env");

export const signToken = (id) => jwt.sign({ id }, secret, { expiresIn: "7d" });

export function veriifyTocken(tocken) {
  try {
    return jwt.verify(tocken, secret);
  } catch {
    throw new AppError("Unauthorized: Invali or expired tocken", 401);
  }
}
