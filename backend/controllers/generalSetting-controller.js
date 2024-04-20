const District = require("../models/districtSchema.js");
const Board = require("../models/boardSchema.js");

const districtCreate = async (req, res) => {
  try {
    const { province, district, tehsil } = req.body;
    console.log(tehsil);
    if (!province || !district) {
      return res.status(400).json({ error: "Missing fields" });
    }
    if (!Array.isArray(tehsil)) {
      return res.status(400).json({ error: "Tehsil in the array" });
    }

    // Create new district
    const createDistrict = new District({
      province,
      district,
      tehsil,
    });

    // Save district to database
    const result = await createDistrict.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const allDistrict = async (req, res) => {
  try {
    let subjects = await District.find();
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No District found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const boardCreate = async (req, res) => {
  try {
    console.log(req.body);
    const board = new Board(req.body);
    const result = await board.save();
    return res.send(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
const allBoard = async (req, res) => {
  try {
    let subjects = await Board.find();
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No Board found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { districtCreate, boardCreate, allDistrict, allBoard };
