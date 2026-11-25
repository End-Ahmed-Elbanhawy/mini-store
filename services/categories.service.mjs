import { Category } from "../models/categories.model.mjs";

export const list = () => Category.findAll({ order: [["name", "ASC"]] });

export const create = async (name) => {
  await Category.create(name);
};
