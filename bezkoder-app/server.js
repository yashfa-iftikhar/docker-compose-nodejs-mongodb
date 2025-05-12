require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:8081", // frontend URL
};
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Import database connection and models
const db = require("./app/models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch((err) => {
    console.error("❌ Cannot connect to the database!", err);
    process.exit(1);
  });

// Simple base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Load routes
require("./app/routes/tutorial.routes")(app);

// Set port from environment or fallback to 8080
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});

