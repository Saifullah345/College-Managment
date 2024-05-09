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
const deleteProgram = async (req, res) => {
  try {
    const id = req.params.id;

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    await Program.findByIdAndDelete(id);

    return res.send({ message: "Program deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { programCreate, allPrograms, deleteProgram };
