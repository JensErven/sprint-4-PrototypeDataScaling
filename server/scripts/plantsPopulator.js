const { v4: uuidv4 } = require("uuid");
const pool = require("../databasepg");
const axios = require("axios");

const populateAmount = 10000;
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
// get a random discoverers id to save with the plant
const fetchRandomUserId = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT id FROM discoverers ORDER BY RANDOM() LIMIT 1"
    );
    return result.rows[0].id;
  } catch (error) {
    console.error("Error fetching random user ID:", error);
    return null;
  } finally {
    client.release();
  }
};

const populatePlants = async () => {
  const fetchedPlantIds = new Set();
  let pageUrl = "/api/v1/plants?page=1";
  let url = `https://trefle.io${pageUrl}&token=${process.env.TREFLE_API_KEY}`;

  let totalCount = 0;
  const client = await pool.connect();
  try {
    while (totalCount < populateAmount) {
      // await new Promise((resolve) => setTimeout(resolve, 50));
      const response = await axios.get(url);

      const plants = response.data.data;

      for (const plant of plants) {
        const { id, common_name, scientific_name, year, image_url, family } =
          plant;

        if (fetchedPlantIds.has(id)) {
          continue;
        }
        let plantName = common_name;
        if (!common_name) {
          plantName = scientific_name;
        }
        const discoverer_id = await fetchRandomUserId();

        // Generate random bloom and planting months
        const randomBloomMonths = await generateRandomMonths();
        const bloomMonthsToString = randomBloomMonths.join(",");
        const getRandomMonth = () => {
          const randomIndex = Math.floor(Math.random() * months.length);
          return months[randomIndex];
        };
        const sowingMonthsToString = getRandomMonth();

        await client.query(
          "INSERT INTO plants (id, common_name, scientific_name, year, image_url, family, discoverer_id, bloom_months, planting_months) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
          [
            id,
            plantName,
            scientific_name,
            year,
            image_url,
            family,
            discoverer_id,
            bloomMonthsToString,
            sowingMonthsToString,
          ]
        );
        fetchedPlantIds.add(id);
        totalCount++;

        if (totalCount >= populateAmount) {
          return;
        }
      }

      const nextPage = response.data.links.next;
      if (nextPage) {
        pageUrl = nextPage;
        url = `https://trefle.io${pageUrl}&token=${process.env.TREFLE_API_KEY}`;
      } else {
        console.log("No more plants available in the API");
        return;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log(
      `Successfully populated ${populateAmount} plants in the database`
    );
    client.release();
  }
};

// const populateBloomAndSowMonths = async () => {
//   try {
//     const allPlants = await client.query("SELECT * FROM plants");

//     for (const plant of allPlants.rows) {
//       // const bloomMonthsToString = "jun, jul, aug, sep";
//       // const sowingMonthsToString = "oct, nov, dec, jan";

//       const randomBloomMonths = await generateRandomMonths();
//       const bloomMonthsToString = randomBloomMonths.join(",");
//       const randomSowingMonths = await generateRandomSowingMonths(
//         randomBloomMonths
//       );
//       const sowingMonthsToString = randomSowingMonths.join(",");
//       await client.query(
//         "UPDATE plants SET bloom_months = $1, planting_months = $2 WHERE id = $3",
//         [bloomMonthsToString, sowingMonthsToString, plant.id]
//       );
//     }

//     console.log(
//       "Successfully populated bloom_months and planting_months for all plants"
//     );
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const generateRandomMonths = async () => {
  const randomAmount = Math.floor(Math.random() * 6) + 1;
  const startIdx = Math.floor(Math.random() * (months.length - randomAmount));
  return months.slice(startIdx, startIdx + randomAmount);
};

const generateRandomSowingMonths = async (bloomMonths) => {
  let randomSowingMonths = await generateRandomMonths(); // Generate random months initially

  // Check for overlap with bloom months
  while (randomSowingMonths.some((month) => bloomMonths.includes(month))) {
    randomSowingMonths = await generateRandomMonths();
  }

  return randomSowingMonths;
};
// get the blooming months from the treffle api
// const fetchBloomAndSowingMonths = async (slug) => {
//   try {
//     const response = await axios.get(
//       `https://trefle.io/api/v1/plants/${slug}?token=${process.env.TREFLE_API_KEY}`
//     );
//     const bloomMonths = response.data.data.main_species.growth.bloom_months;
//     console.log("Bloom Months:", bloomMonths);

//     if (bloomMonths === null) {
//       const randomBloomMonths = generateRandomMonths();
//       const randomSowingMonths = generateRandomSowingMonths(randomBloomMonths);

//       console.log("Random Bloom Months:", randomBloomMonths);
//       console.log("Random Sowing Months:", randomSowingMonths);
//       return {
//         bloomMonths: randomBloomMonths,
//         sowingMonths: randomSowingMonths,
//       };
//     } else {
//       const randomSowingMonths = generateRandomSowingMonths(bloomMonths);

//       return { bloomMonths, sowingMonths: randomSowingMonths };
//     }
//   } catch (error) {
//     console.error("Error fetching bloom_months:", error);
//     return null;
//   }
// };

// const populatePlants = async () => {
//   const fetchedPlantIds = new Set();

//   try {
//     let pageUrl = "/api/v1/plants?page=1";
//     let url = `https://trefle.io${pageUrl}&token=${process.env.TREFLE_API_KEY}`;

//     let totalCount = 0;

//     while (totalCount < populateAmount) {
//       try {
//         const response = await axios.get(url);

//         const plants = response.data.data;

//         for (const plant of plants) {
//           const {
//             id,
//             slug,
//             common_name,
//             scientific_name,
//             year,
//             image_url,
//             family,
//           } = plant;

//           const discoverer_id = await fetchRandomUserId();
//           const { bloomMonths, sowingMonths } = await fetchBloomAndSowingMonths(
//             slug
//           );
//           const bloomMonthsToString = bloomMonths.join(",");
//           const sowingMonthsToString = sowingMonths.join(",");

//           if (fetchedPlantIds.has(id)) {
//             continue;
//           }
//           let plantName = common_name;
//           if (!common_name) {
//             plantName = scientific_name;
//           }

//           await client.query(
//             "INSERT INTO plants (id, common_name, scientific_name, year, image_url, family, discoverer_id, bloom_months, planting_months) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
//             [
//               id,
//               plantName,
//               scientific_name,
//               year,
//               image_url,
//               family,
//               discoverer_id,
//               bloomMonthsToString,
//               sowingMonthsToString,
//             ]
//           );

//           fetchedPlantIds.add(id);
//           totalCount++;

//           if (totalCount >= populateAmount) {
//             console.log(
//               `Successfully populated ${populateAmount} plants in the database`
//             );
//             return;
//           }
//         }

//         const nextPage = response.data.links.next;
//         if (nextPage) {
//           pageUrl = nextPage;
//           url = `https://trefle.io${pageUrl}&token=${process.env.TREFLE_API_KEY}`;
//         } else {
//           console.log("No more plants available in the API");
//           return;
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 429) {
//           console.error("Rate limited, waiting before retrying...");
//           await new Promise((resolve) => setTimeout(resolve, 5000));
//           continue;
//         } else {
//           console.error("Error:", error);
//           break;
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
// Call the function to populate plants table
module.exports = { populatePlants };
