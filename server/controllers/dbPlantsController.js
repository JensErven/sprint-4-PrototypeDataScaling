// const client = require("../databasepg");
const pool = require("../databasepg");

// Example function to get all plants data from the plants table
const getPlants = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM plants");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const deletePlants = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM plants"); // Delete all rows from the users table
    res.status(200).json({ message: "All plants deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const createPlantsTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
           CREATE TABLE IF NOT EXISTS plants (
                id UUID PRIMARY KEY,
                common_name VARCHAR(100) NOT NULL,
                scientific_name VARCHAR(100) NOT NULL,
                year INTEGER, -- Change the data type based on the year type in your API
                image_url VARCHAR(255), -- Adjust the length as needed
                family VARCHAR(100), -- Adjust the length as needed
                discoverer VARCHAR(100), -- Adjust the length as needed
                bloom_season VARCHAR(50),
                planting_season VARCHAR(50)
                )`);
    console.log('Table "plants" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    client.release();
  }
};

module.exports = { getPlants, deletePlants, createPlantsTable };
