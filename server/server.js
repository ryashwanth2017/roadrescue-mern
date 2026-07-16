const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const requestRoutes = require("./routes/requestRoutes");
const auth = require("./middleware/auth");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/requests", requestRoutes);

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "RoadRescue Backend Running Successfully 🚗"
    });
});

// Protected Route
app.get("/api/profile", auth, (req, res) => {
    res.json({
        message: "Protected Route Accessed Successfully",
        loggedInUser: req.user
    });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});