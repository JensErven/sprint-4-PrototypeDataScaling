const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const cors = require("cors");
const { createTable } = require("./controllers/dbController");
const { populateUsers } = require("./scripts/userPopulator");
const { populatePlants } = require("./scripts/plantPopulator");
const { createPlantsTable } = require("./controllers/dbPlantsController");

app.use(express.json()); // Add this line to parse JSON bodies

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
};

// createTable();
// createPlantsTable();
// populateUsers();
// populatePlants();

app.use(cors(corsOptions));

// Mount your API routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
