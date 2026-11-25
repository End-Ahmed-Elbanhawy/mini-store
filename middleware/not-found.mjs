import { AppError } from "../utils/app-error.mjs";

export default (req, res, next) => next(new AppError("Route not found", 404));