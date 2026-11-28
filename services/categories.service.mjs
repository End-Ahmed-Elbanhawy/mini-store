import { Category } from "../models/index.mjs";

export const list = () => Category.findAll({ order: [["name", "ASC"]] });

export const create = ({ name }) => {
  console.log(name);
  Category.create({ name });
};
