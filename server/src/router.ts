import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
// import itemActions from "./modules/item/itemActions";
import itemsAction from "./modules/item/itemAction";
import userActions from "./modules/user/usersAction";
import categoriesAction from "./modules/categorie/categorieAction";
import characterActions from "./modules/characters/characterAction";
import inventoryActions from "./modules/inventory/inventoryAction";
import caractereClassAction from "./modules/caractereClass/caractereClassAction";

router.get("/api/items", itemsAction.browse);
router.get("/api/items/:id", itemsAction.read);
router.post("/api/items", itemsAction.add);
router.delete("/api/items/:id", itemsAction.destroy);
router.put("/api/items/:id", itemsAction.edit);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.readById);
router.post("/api/users", userActions.create);

router.get("/api/categories", categoriesAction.browse);

router.get("/api/characters", characterActions.browse);
router.get("/api/characters/:id", characterActions.read);
router.post("/api/characters", characterActions.add);
router.delete("/api/characters/:id", characterActions.destroy);
router.put("/api/characters/edit/:id", characterActions.edit);

router.get("/api/inventory", inventoryActions.browse);
router.get("/api/inventory/:id", inventoryActions.readAllByCaractere);

router.get("/api/caractere/classes", caractereClassAction.browse);
router.get("/api/caractereClasses/:id", caractereClassAction.readById);

/* ************************************************************************* */

export default router;
