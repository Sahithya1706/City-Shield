const express = require("express");
const router = express.Router();
const GeneralIssue = require("../models/GeneralIssue");
const multer = require("multer");
const path = require("path");

// multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all issues
router.get("/", async (req, res) => {
  const issues = await GeneralIssue.find().sort({ createdAt: -1 });
  res.json(issues);
});

// CREATE issue
router.post("/", upload.single("image"), async (req, res) => {
  const issue = new GeneralIssue({
    title: req.body.title,
    category: req.body.category,
    location: req.body.location,
    severity: req.body.severity,
    description: req.body.description,
    image: req.file ? req.file.filename : "",
  });

  await issue.save();
  res.json(issue);
});

// RESOLVE issue
router.put("/:id/resolve", async (req, res) => {
  const issue = await GeneralIssue.findByIdAndUpdate(
    req.params.id,
    { status: "resolved" },
    { new: true }
  );
  res.json(issue);
});

module.exports = router;
