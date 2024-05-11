const Tehsil = require("../models/tehsilSchema.js");

const tehsilCreate = async (req, res) => {
  try {
    const { tehsil, districtId, provinceId } = req.body;

    if (!tehsil) {
      return res.status(400).json({ error: "Tehsil is required" });
    }
    if (!districtId) {
      return res.status(400).json({ error: "District Id is required" });
    }
    if (!provinceId) {
      return res.status(400).json({ error: "Province Id is required" });
    }
    const existingTehsil = await Tehsil.findOne({ tehsil });

    if (existingTehsil) {
      return res.status(400).json({ error: "Tehsil already exists" });
    }

    // Create new district
    const createTehsil = new Tehsil({
      tehsil,
      districtId,
      provinceId,
    });

    // Save district to database
    const result = await createTehsil.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const allTehsil = async (req, res) => {
  try {
    let tehsil = await Tehsil.find().populate("districtId provinceId");
    if (tehsil.length > 0) {
      res.send(tehsil);
    } else {
      res.send({ message: "No Tehsil found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteTehsil = async (req, res) => {
  try {
    const id = req.params.id;

    const session = await Tehsil.findById(id);

    if (!session) {
      return res.status(404).json({ error: "Tehsil not found" });
    }

    await Tehsil.findByIdAndDelete(id);

    return res.send({ message: "Tehsil deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { tehsilCreate, allTehsil, deleteTehsil };
