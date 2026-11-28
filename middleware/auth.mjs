import { User } from "../models/index.mjs";
import { UserRole } from "../models/user.model.mjs";
import { AppError } from "../utils/app-error.mjs";

export async function authGuard(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return next(new AppError("Unauthorized: Token is missing", 401));
  }

  const user = await User.findByToken(token);

  if (!user) {
    return next(new AppError("Unauthorized: User not found", 401));
  }
  req.user = user;
  next();
}

export function adminOnly(req, res, next) {
  if (req.user.role !== UserRole.ADMIN) {
    throw new AppError("Admin only", 403);
  }
  next()
}

export const isAdmin = (req) => req.user?.role === UserRole.ADMIN;
