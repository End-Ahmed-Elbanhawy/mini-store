import { Router } from "express";
import * as c from "../controllers/auth.controller.mjs";
import { rateLimit } from "../middleware/rate-limit.mjs";
import { requireFields } from "../middleware/require-fields.mjs";
import { authGuard } from "../middleware/auth.mjs";

export const authRouter = Router();

const limiter = rateLimit({ max: 10, windowMinutes: 15 });

authRouter.post(
  "/register",
  limiter,
  requireFields("name", "email", "password"),
  c.register,
);

authRouter.post(
  "/login",
  limiter,
  requireFields("email", "password"),
  c.login,
);

authRouter.get("/me", authGuard, c.me);
