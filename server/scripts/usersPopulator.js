const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const client = require("../databasepg");
const usernameGenerator = require("username-generator");

const populateUsers = async () => {
  try {
    // Generating and inserting 100 users
    for (let i = 0; i < 1000; i++) {
      const randomUUID = uuidv4();
      const username = usernameGenerator.generateUsername();
      const email = `${username}@example.com`;
      const password = "test123";

      await client.query(
        "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
        [randomUUID, username, email, password]
      );
    }
    console.log("Users populated successfully");
  } catch (error) {
    console.error("Error populating users:", error);
  } finally {
    // Close the database connection when done
    client.end();
  }
};

// Call the function to populate users table
module.exports = { populateUsers };
