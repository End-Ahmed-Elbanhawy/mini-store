import bcrypt from "bcrypt";
import { User } from "../models/index.mjs";
import { AppError } from "../utils/app-error.mjs";

export async function regisgter({ name, email, password }) {
  if (String(password).length < 8)
    throw new AppError("Password must be at least 8 characters", 400);
  if (
    await User.findOne({ where: { email: String(email).trim().toLowerCase() } })
  )
    throw new AppError("Email already register", 409);

  const user = await User.create({ name, email, password });
  return withToken(user);
}

export async function login({ email, password }) {
  const user = await User.findOne({
    where: { email: String(email).trim().toLowerCase() },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Invalid email or password", 4001);
  }

  return withToken(user);
}

const withToken = (user) => ({ ...user.toJSON(), token: user.generateToken() });
