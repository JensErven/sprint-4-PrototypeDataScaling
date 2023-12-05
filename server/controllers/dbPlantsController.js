// const client = require("../databasepg");
const pool = require("../databasepg");

const getPlants = async (req, res) => {
  const client = await pool.connect();
  try {
    const page = req.query.page || 1; // Get the requested page number from the query params
    const itemsPerPage = 10; // Number of items to display per page
    const offset = (page - 1) * itemsPerPage; // Calculate the offset based on the page number

    // Fetch data with pagination
    const result = await client.query(
      `SELECT * FROM plants ORDER BY id LIMIT $1 OFFSET $2`,
      [itemsPerPage, offset]
    );

    // Fetch total count of items
    const totalCount = await client.query(`SELECT COUNT(*) FROM plants`);
    const totalItems = parseInt(totalCount.rows[0].count);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Create pagination metadata
    const paginationInfo = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    };

    // Prepare response object
    const response = {
      pagination: paginationInfo,
      plants: result.rows,
    };

    res.json(response);
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

const getPlantsWithDiscoverer = async (req, res) => {
  const { id } = req.params; // Extract the UUID from the query parameters
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM plants JOIN discoverers ON plants.discoverer_id = discoverers.id WHERE discoverers.id = $1`,
      [id]
    );
    res.json(result.rows);
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
        discoverer_id UUID,
        bloom_season VARCHAR(50),
        planting_season VARCHAR(50)
      );

      ALTER TABLE plants
      ADD CONSTRAINT fk_discoverer
      FOREIGN KEY (discoverer_id)
      REFERENCES discoverers(id)
      ON DELETE CASCADE
    `);
    console.log('Table "plants" created successfully');
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    client.release();
  }
};

module.exports = {
  getPlants,
  deletePlants,
  createPlantsTable,
  getPlantsWithDiscoverer,
};
