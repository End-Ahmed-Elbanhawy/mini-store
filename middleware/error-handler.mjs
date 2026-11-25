import { AppError } from "../utils/app-error.mjs";


const SequelizeErrors = Object.freeze({
    UniqueConstraintError: "SequelizeUniqueConstraintError",
    ValidationError: "SequelizeValidationError",
    DatabaseError: "SequelizeDatabaseError",
    ForeignKeyConstraintError: "SequelizeForeignKeyConstraintError",
});

const send = (res, statusCode, message) =>
    req.originalUrl.startsWith("/api")
        ? res.status(statusCode).json({ status: statusCode, message })
        : res.status(statusCode).render("error", { statusCode, message });

export default (err, req, res, next) => {

    if (err instanceof AppError) {
        return send(res, err.statusCode, err.message);
    }

    //Wrong JSON
    if (err.type === "entity.parse.failed") {
        return send(res, 400, "Invalid JSON body");
    }

    if (err.status >= 400 && err.status < 500) {
        return send(res, err.status, err.message);
    }
    //Sequelize Errors
    if (err.name === SequelizeErrors.UniqueConstraintError) {
        return send(res, 409, "Already exists");
    }

    if (err.name === SequelizeErrors.ValidationError) {
        return send(res, 400, err.errors.map((e) => e.message).join(", "));
    }

    if (err.name === SequelizeErrors.ForeignKeyConstraintError) {
        return send(res, 409, "Related record missing or still in use");
    }

    if (err.name === SequelizeErrors.DatabaseError) {
        console.error("DB ERROR ", err.message);
        return send(res, 409, "Database error");
    }

    //Fallback
    console.error("Error ", err.message);
    send(res, 500, "Something went very wrong!");
}