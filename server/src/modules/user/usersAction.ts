import type { RequestHandler } from "express";
import userRepository from "./usersRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all items
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // Create the item
    const insertId = await userRepository.create(newUser);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const readById: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);
    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    // Create the item
    const insertId = await userRepository.create(newUser);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, add, readById, destroy, create };
