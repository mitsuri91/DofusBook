import type { RequestHandler } from "express";
import itemsRepository from "./itemRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all items
    const items = await itemsRepository.readAll();
    res.json(items);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const newItem = {
      name: req.body.name,
      category_id: req.body.category_id,
      level_required: req.body.level_required,
      created_at: new Date(), // Add the created_at property
    };

    // Create the item
    const insertId = await itemsRepository.create(newItem);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    const item = await itemsRepository.read(itemId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (item == null) {
      res.sendStatus(404);
    } else {
      res.json(item);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const itemId = Number(req.params.id);
    await itemsRepository.delete(itemId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  // Fetch a specific item based on the provided ID
  try {
    const item = {
      id: Number(req.params.id),
      name: req.body.name,
      category_id: req.body.category_id,
      level_required: req.body.level_required,
    };
    const affectedRows = await itemsRepository.uptade(item);
    if (affectedRows === 0) {
      res.sendStatus(422);
    } else {
      res.status(204).json({ success: true, message: "Update succesfully" });
    }
  } catch (err) {
    next(err);
  }
};
// Closing brace for the outer try block

export default { browse, add, read, destroy, edit };
