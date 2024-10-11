const router = require("express").Router();
const Candidate = require("../../models/payment/competitormodel");
const express = require("express");
const path = require("path");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads/payment");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Add a candidate
router.post("/add", upload.single("image"), (req, res) => {
  const { name, age, email, gender, contact_number, comp_type } = req.body;
  const image = req.file.filename;

  const newCandidate = new Candidate({
    name,
    age,
    email,
    gender,
    contact_number,
    comp_type,
    image,
  });

  newCandidate
    .save()
    .then(() => {
      res.json("Candidate Added");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding candidate");
    });
});

// Serve uploaded images
router.use(
  "/uploads/payment",
  express.static(path.join(__dirname, "../../client/public/uploads/payment"))
);

// Read all candidates
router.get("/read", (req, res) => {
  Candidate.find()
    .then((candidates) => {
      res.json(candidates);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error reading candidates");
    });
});

// Update a candidate
router.put("/update/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, age, email, contact_number, gender, comp_type, image } =
    req.body;

  try {
    const updateCandidate = {
      name,
      age,
      email,
      gender,
      contact_number,
      comp_type,
      image,
    };

    await Candidate.findByIdAndUpdate(userId, updateCandidate);
    res.status(200).send({ status: "User updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error in updating data", error: err.message });
  }
});

// Delete a candidate
router.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await Candidate.findByIdAndDelete(userId);
    res.status(200).send({ status: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "Error in deleting user", error: err.message });
  }
});

// Get a candidate by ID
router.get("/get/:id", async (req, res) => {
  const userId = req.params.id;

  const getID = await Candidate.findById(userId)
    .then((candidate) => {
      res.json({
        name: candidate.name,
        age: candidate.age,
        gender: candidate.gender,
        email: candidate.email,
        contact_number: candidate.contact_number,
        comp_type: candidate.comp_type,
        image: candidate.image,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
