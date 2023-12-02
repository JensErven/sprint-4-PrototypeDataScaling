// const { Client } = require("pg");
require("dotenv").config();

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client
//   .connect()
//   .then(() => console.log("Connected to the database"))
//   .catch((err) => console.error("Connection error", err));

// module.exports = client;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your PostgreSQL connection string
  ssl: {
    rejectUnauthorized: false, // For development; set to true in production with proper SSL certs
  },
  // other configuration options...
});

module.exports = pool;
