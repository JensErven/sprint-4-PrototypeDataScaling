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
  searchPlantsByCommonName,
  getPlantById,
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

// Discoverers ENDPOINTS

/** Purpose: get all the discoverers */
router.get("/discoverers", getDiscoverers);
/** Purpose: delete all the discoverers */
router.delete("/discoverers", deleteDiscoverers);
/** Purpose: get discoverer by id */
router.get("/discoverers/:id", getDiscovererById);
/** Purpose: delete discoverer by id */
router.delete("/discoverers/:id", deleteDiscovererById);

/**@plants */
router.get("/plants", getPlants);
router.delete("/plants", deletePlants);
router.get("/plants/discoverer/:id", getPlantsWithDiscoverer);
router.get("/plants/search", searchPlantsByCommonName);
router.get("/plants/plant/:id", getPlantById);

module.exports = router;
