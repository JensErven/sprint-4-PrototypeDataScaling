const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUsers,
} = require("../controllers/dbController");

// Define your API endpoints
router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users", deleteUsers);

module.exports = router;
