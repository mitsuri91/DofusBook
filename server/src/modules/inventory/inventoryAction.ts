import type { RequestHandler } from "express";
import inventoryRepository from "./inventoryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID

    const inventory = await inventoryRepository.readAll();

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (inventory == null) {
      res.sendStatus(404);
    } else {
      res.json(inventory);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const readAllByCaractere: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const characterId = Number(req.params.id);
    const inventory = await inventoryRepository.readById(characterId);
    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (inventory == null) {
      res.sendStatus(404);
    } else {
      res.json(inventory);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, readAllByCaractere };
