const client = require("../databasepg");
const { v4: uuidv4 } = require("uuid");

// Example function to get data from a table
const getUsers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Example function to add data to a table
const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const randomUUID = uuidv4();
  try {
    await client.query(
      "INSERT INTO users (id,username, email, password) VALUES ($1, $2, $3, $4)",
      [randomUUID, username, email, password]
    );
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await client.query("DELETE FROM users"); // Delete all rows from the users table
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTable = async () => {
  try {
    await client.query(`
         CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
              )`);
    console.log('Table "users" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
module.exports = { getUsers, addUser, deleteUsers, createTable };
