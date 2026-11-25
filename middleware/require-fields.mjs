import { AppError } from "../utils/app-error.mjs";

export const requireFields =
  (...fields) =>
  (req, res, next) => {
    const missingFields = fields.filter(
      (field) => req.body?.[field] === undefined || req.body[field] === "",
    );

    if (missingFields.length > 0) {
      throw new AppError(
        `Missing required fields: ${missingFields.join(", ")}`,
        400,
      );
    }
    next();
  };
