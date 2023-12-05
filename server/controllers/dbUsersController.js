const pool = require("../databasepg");
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

// function to get all users from users table
const getUsers = async (req, res) => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT username, email,id FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

// function to register a user in the users table
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const randomUUID = uuidv4();
  const client = await pool.connect();

  try {
    // Check if the user with the provided email already exists
    const checkUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // If user doesn't exist, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 10);
    // If user doesn't exist, proceed with registration
    await client.query(
      "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
      [randomUUID, username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const deleteUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM users"); // Delete all rows from the users table
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const client = await pool.connect();

  try {
    // Check if the user with the provided email exists
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "User with this email doesn't exist" });
    }

    const hashedPasswordFromDB = user.rows[0].password;
    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // User found, authentication successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const getUserByUuid = async (req, res) => {
  const { uuid } = req.params; // Extract the UUID from the query parameters
  const client = await pool.connect();

  try {
    // Check if the user with the provided UUID exists
    const user = await client.query("SELECT * FROM users WHERE id = $1", [
      uuid,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    // User found, authentication successful
    const userData = user.rows[0]; // Assuming a single user is found
    res.status(200).json({ message: "user found", user: userData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const createUsersTable = async () => {
  const client = await pool.connect();
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
  } finally {
    client.release();
  }
};
module.exports = {
  getUsers,
  registerUser,
  deleteUsers,
  createUsersTable,
  loginUser,
  getUserByUuid,
};
