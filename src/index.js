const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorhandler");

dotenv.config({ path: "./.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
app.use("/api", taskRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
