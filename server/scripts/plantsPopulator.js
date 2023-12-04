const { v4: uuidv4 } = require("uuid");
const client = require("../databasepg");
const axios = require("axios");

const fetchRandomUserId = async () => {
  try {
    const result = await client.query(
      "SELECT id FROM discoverers ORDER BY RANDOM() LIMIT 1"
    );
    return result.rows[0].id;
  } catch (error) {
    console.error("Error fetching random user ID:", error);
    return null;
  }
};

const populatePlants = async () => {
  let pageUrl = "/api/v1/plants?page=1";
  let url = `https://trefle.io${pageUrl}&token=${process.env.TREFLE_API_KEY}`;

  let totalCount = 0;

  try {
    while (totalCount < 100) {
      const response = await axios.get(url);

      const plants = response.data.data; // Array of plants from the API response

      for (const plant of plants) {
        const { common_name, scientific_name, year, image_url, family } = plant; // Extract relevant data from the API response

        const id = uuidv4(); // Generate a UUID for the plant
        const discoverer_id = await fetchRandomUserId(); // Fetch a random user ID

        // Generate a random bloom season using a subset of months (as numbers)
        const bloom_season = [
          Math.floor(Math.random() * 12) + 1, // Random month between 1 and 12
          Math.floor(Math.random() * 12) + 1, // Random month between 1 and 12
        ].join(" - ");

        // Generate a random planting season using a subset of months (as numbers)
        const planting_season = [
          Math.floor(Math.random() * 12) + 1, // Random month between 1 and 12
          Math.floor(Math.random() * 12) + 1, // Random month between 1 and 12
        ].join(" - ");

        // Insert the plant data into the database
        await client.query(
          "INSERT INTO plants (id, common_name, scientific_name, year, image_url, family,discoverer_id, bloom_season, planting_season) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)",
          [
            id,
            common_name,
            scientific_name,
            year,
            image_url,
            family,
            discoverer_id,
            bloom_season,
            planting_season,
          ]
        );

        totalCount++;

        if (totalCount >= 100) {
          // Reached the limit of 100 plants
          console.log("Successfully populated 100 plants in the database");
          return;
        }
      }

      // Check if there's a next page in the API response
      const nextPage = response.data.links.next;
      if (nextPage) {
        pageUrl = nextPage; // Move to the next page for more plants
      } else {
        // No more pages available
        console.log("No more plants available in the API");
        return;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Do not close the database connection here to allow multiple queries
  }
};
// Call the function to populate plants table
module.exports = { populatePlants };
