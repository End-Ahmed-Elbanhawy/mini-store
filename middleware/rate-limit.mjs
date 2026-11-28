import { AppError } from "../utils/app-error.mjs";

export function rateLimit({ max, windowMinutes }) {
  const windowMs = windowMinutes * 60 * 1000;
  const failures = new Map();

  return (req, res, next) => {
    const now = Date.now();

    const key = `${req.ip}|${String(req.body?.email ?? req.user?.id ?? "")
      .trim()
      .toLowerCase()}`;
    let entry = failures.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      failures.set(key, entry);
    }

    if (entry.count >= max) {
      const seconds = Math.ceil((entry.resetAt - now) / 1000);
      const minutes = Math.ceil(seconds / 60);
      res.set("Retry-After", seconds);
      return next(
        new AppError(
          `Too man failed attempts. try again in ${minutes} minutes${minutes > 1 ? "s" : ""}`,
          429,
        ),
      );
    }

    res.on("finish", () => {
      if (res.statusCode >= 400) entry.count++;
    });

    next();
  };
}
