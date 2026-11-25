import { Router } from "express";
import * as c from "../controllers/categories.controller.mjs";
import { requireFields } from "../middleware/require-fields.mjs";

export const categoriesRouter = Router();
const admin = [authGuard, adminOnly];

categoriesRouter
  .route("/")
  .get(c.list)
  .post(...admin, requireFields("name"), c.create);
