import { sequelize } from "../config/db.mjs";
import { Category } from "./categories.model.mjs";
import { Product } from "./products.model.mjs";
import { User } from "./user.model.mjs";

const fk = (name, onDelete = "CASCADE") => ({
  foreignKey: {
    name,
    allowNull: false,
  },
  onDelete,
});

Category.hasMany(Product, fk("categoryId", "RESTRICT"));
Product.belongsTo(Category, fk("categoryId", "RESTRICT"));

export { sequelize, Category, Product, User };
