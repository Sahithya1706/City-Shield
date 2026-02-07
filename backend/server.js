const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const alertRoutes = require("./routes/alerts");
const streetLightRoutes = require("./routes/streetLight");
const wasteRoutes = require("./routes/waste");
const housingRoutes = require("./routes/housing");
const generalIssueRoutes = require("./routes/generalIssue");


const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("CityShield Backend is running 🚀");
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/street-lights", streetLightRoutes);
app.use("/api/waste", wasteRoutes);
app.use("/api/housing", housingRoutes);
app.use("/api/general-issues", generalIssueRoutes);
app.use("/uploads", express.static("uploads"));


// ================= DB CONNECT + SERVER START =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
