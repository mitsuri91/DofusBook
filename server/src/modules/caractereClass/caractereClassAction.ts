import type { RequestHandler } from "express";
import caractereClassRepository from "./caractereClassRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all categories
    const classes = await caractereClassRepository.readAll();
    res.json(classes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readById: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const caractereId = Number(req.params.id);
    const user = await caractereClassRepository.read(caractereId);
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

export default { browse, readById };
