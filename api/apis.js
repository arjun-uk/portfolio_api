const express = require("express");
const router = express.Router();
const productHelper = require("../helper/Helper");
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://153arjununni1234:PodaThayoli@cluster0.ricsbah.mongodb.net/portfolio";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// GET all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await db.collection("projects").find().toArray();
    if (projects.length === 0) {
      res.status(404).json({ status: "0", message: "No projects found" });
      return;
    } else {
      res.json({ status: "1", projects: projects });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/expertise", async (req, res) => {
  try {
    const expertise = await db.collection("expertise").find().toArray();

    if (expertise.length === 0) {
      res.status(404).json({ status: "0", message: "No expertise found" });
      return;
    } else {
      res.json({ status: "1", expertise: expertise });
    }
    res.json(expertise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add_project", async (req, res) => {
  try {
    const { first_name, last_name, filename } = req.body;

    // Prepare the response
    const response = {
      project_name: first_name,
      project_link: last_name,
      filename: filename,
    };

    await db.collection("projects").insertOne(response);

    res.json({ status: "1", result: response });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add_expertise", async (req, res) => {
  try {
    const { exp_name, file_name } = req.body;

    // Prepare the response
    const response = {
      exp_name: exp_name,
      file_name: file_name,
    };

    await db.collection("expertise").insertOne(response);

    res.json({ status: "1", result: response });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
