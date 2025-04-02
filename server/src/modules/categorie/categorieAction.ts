import type { RequestHandler } from "express";
import categoriesRepository from "./categorieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // fetch all categories
    const categories = await categoriesRepository.readAll();
    res.json(categories);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
export default { browse };
