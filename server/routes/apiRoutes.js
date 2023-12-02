const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUsers,
} = require("../controllers/dbController");
const {
  deletePlants,
  getPlants,
} = require("../controllers/dbPlantsController");

// Define your API endpoints

/**@users */
router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users", deleteUsers);

/**@plants */
router.get("/plants", getPlants);
router.delete("/plants", deletePlants);

module.exports = router;
