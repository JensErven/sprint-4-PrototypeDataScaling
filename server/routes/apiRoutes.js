const express = require("express");
const router = express.Router();
const {
  getUsers,
  loginUser,
  registerUser,
  deleteUsers,
  getUserByUuid,
} = require("../controllers/dbUsersController");
const {
  deletePlants,
  getPlants,
  getPlantsWithDiscoverer,
} = require("../controllers/dbPlantsController");
const {
  getDiscoverers,
  deleteDiscoverers,
  getDiscovererById,
  deleteDiscovererById,
} = require("../controllers/dbDiscoverersController");

// Define your API endpoints

/**@users */
router.get("/users", getUsers);
router.delete("/users", deleteUsers);
router.get("/users/:uuid", getUserByUuid);

// Login and Register Endpoints
router.post("/login", loginUser);
router.post("/register", registerUser);

// Discoverers
router.get("/discoverers", getDiscoverers);
router.delete("/discoverers", deleteDiscoverers);
router.get("/discoverers/:id", getDiscovererById);
router.delete("/discoverers/:id", deleteDiscovererById);

/**@plants */
router.get("/plants", getPlants);
router.delete("/plants", deletePlants);
router.get("/plants/discoverer/:id", getPlantsWithDiscoverer);

module.exports = router;
