const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const cors = require("cors");
const { createUsersTable } = require("./controllers/dbUsersController");
const { populateUsers } = require("./scripts/usersPopulator");
const { populatePlants } = require("./scripts/plantsPopulator");
const { populateDiscoverers } = require("./scripts/discoverersPopulator");
const { createPlantsTable } = require("./controllers/dbPlantsController");
const {
  createDiscoverersTable,
} = require("./controllers/dbDiscoverersController");

app.use(express.json()); // Add this line to parse JSON bodies

const allowedOrigins = [
  "http://localhost:3000",
  "https://sprint-4-prototype-data-scaling.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
};

// createUsersTable();
// createPlantsTable();
// populateUsers();
// populatePlants();
// createDiscoverersTable();
// populateDiscoverers();

app.use(cors(corsOptions));

// Mount your API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
