import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";

export const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "categories",
  },
);
