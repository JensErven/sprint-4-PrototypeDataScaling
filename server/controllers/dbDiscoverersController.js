// const client = require("../databasepg");
const pool = require("../databasepg");

// Example function to get all plants data from the plants table
const getDiscoverers = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM discoverers");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const deleteDiscoverers = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM discoverers"); // Delete all rows from the users table
    res.status(200).json({ message: "All discoverers deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const getDiscovererById = async (req, res) => {
  const { id } = req.params; // Extract the UUID from the query parameters
  const client = await pool.connect();
  try {
    // Check if the user with the provided UUID exists
    const discoverer = await client.query(
      "SELECT * FROM discoverers WHERE id = $1",
      [id]
    );

    if (discoverer.rows.length === 0) {
      return res.status(401).json({ error: "discoverer doesn't exist" });
    }

    // User found, authentication successful
    const discovererData = discoverer.rows[0]; // Assuming a single user is found
    res
      .status(200)
      .json({ message: "discoverer found", discoverer: discovererData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
};

const deleteDiscovererById = async (req, res) => {
  const { id } = req.params; // Extract the UUID from the query parameters
  const client = await pool.connect();
  try {
    await client.query(`
         DELETE FROM discoverers WHERE id = '${id}'`);
    res.status(200).json({ message: "discoverer deleted successfully" });
    console.log("discoverer deleted successfully");
  } catch (error) {
    console.error(`error deleting discoverer with id ${id}`, error);
  } finally {
    client.release();
  }
};

const createDiscoverersTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS discoverers (
                id UUID PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                biography VARCHAR(500) NOT NULL,
                origin VARCHAR(50) NOT NULL)`);
    console.log('Table "discoverers" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    client.release();
  }
};

module.exports = {
  getDiscoverers,
  deleteDiscoverers,
  createDiscoverersTable,
  getDiscovererById,
  deleteDiscovererById,
};
