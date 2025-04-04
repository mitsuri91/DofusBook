import type { RequestHandler } from "express";
import characterRepository from "./characterRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all characters
    const characters = await characterRepository.readAll();
    res.json(characters);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the character data from the request body
    const newCharacter = {
      name: req.body.name,
      user_id: req.body.user_id,
      class_id: req.body.class_id,
      gender: req.body.gender,
      level: req.body.level,
    };

    // Create the character
    const insertId = await characterRepository.create(newCharacter);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted character
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific character based on the provided ID
    const characterId = Number(req.params.id);
    const character = await characterRepository.readById(characterId);

    // If the character is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the character in JSON format
    if (character == null) {
      res.sendStatus(404);
    } else {
      res.json(character);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific character based on the provided ID
    const characterId = Number(req.params.id);
    await characterRepository.delete(characterId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  console.info(req.body);
  try {
    const character = {
      id: Number(req.params.id),
      user_id: req.body.user_id,
      class_id: req.body.class_id,
      name: req.body.name,
      gender: req.body.gender,
      level: req.body.level,
    };
    console.info(character);
    const affectedRows = await characterRepository.uptade(character);
    if (affectedRows === 0) {
      res.sendStatus(422);
    } else {
      res.status(204).json({ success: true, message: "Update succesfully" });
    }
  } catch (err) {
    next(err);
  }

  // const ReadInventory: RequestHandler = async (req, res, next) => {
  //   try {
  //     const characterId = Number(req.params.id);
  //     const inventory = await characterRepository.Inventory(characterId);
  //     // If the character is not found, respond with HTTP 404 (Not Found)
  //     // Otherwise, respond with the character in JSON format
  //     if (inventory == null) {
  //       res.sendStatus(404);
  //     } else {
  //       res.json(inventory);
  //     }
  //   } catch (err) {
  //     // Pass any errors to the error-handling middleware
  //     next(err);
  //   }
  // };
};
export default { browse, add, read, destroy, edit };
