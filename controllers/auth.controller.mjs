import * as auth from "../services/auth.service.mjs";

export const register = async (req, res) =>
  res.status(201).json({ user: await auth.regisgter(req.body) });

export const login = async (req, res) =>
  res.json({ message: "Logged in", user: await auth.login(req.body) });

export const me = (req, res) => res.json({ user: req.user });
