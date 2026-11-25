import { sequelize } from "./config/db.mjs";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFound from "./middleware/not-found.mjs";
import errorHandler from "./middleware/error-handler.mjs";
import helmet from "helmet";


await sequelize.authenticate();

const app = express();

app.disable("x-powered-by");

app.set("json spaces", 2);

app.use(helmet());

app.use(cors());

app.use(morgan("combined"));

app.use(express.json());









app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));