const Program = require("../models/programSchema.js");

const programCreate = async (req, res) => {
  try {
    const { program } = req.body;

    if (!program) {
      return res.status(400).json({ error: "Program is required" });
    }
    const existingProgram = await Program.findOne({ program });

    if (existingProgram) {
      return res.status(400).json({ error: "Program already exists" });
    }

    // Create new district
    const createProgram = new Program({
      program,
    });

    // Save district to database
    const result = await createProgram.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const allPrograms = async (req, res) => {
  try {
    let Programs = await Program.find();
    if (Programs.length > 0) {
      res.send(Programs);
    } else {
      res.send({ message: "No Programs found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { programCreate, allPrograms };
