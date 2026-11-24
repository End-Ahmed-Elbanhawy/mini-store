import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";


export const Product = sequelize.define(
    "Product",
    {
        name: {
            type: DataTypes.STRING(120),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    },
    { tableName: "products" }
);