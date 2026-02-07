const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");

// GET all
router.get("/", async (req, res) => {
  const data = await Waste.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  const waste = new Waste(req.body);
  await waste.save();
  res.json(waste);
});

// MARK DONE
router.put("/:id/done", async (req, res) => {
  const waste = await Waste.findByIdAndUpdate(
    req.params.id,
    { status: "done" },
    { new: true }
  );
  res.json(waste);
});

// REOPEN
router.put("/:id/reopen", async (req, res) => {
  const waste = await Waste.findByIdAndUpdate(
    req.params.id,
    { status: "scheduled" },
    { new: true }
  );
  res.json(waste);
});

module.exports = router;
