import * as service from "../services/categories.service.mjs";

export const list = async (req, res) => res.json(await service.list());

export const create = async (req, res) =>
  res.status(201).json(await service.create(req.body));
