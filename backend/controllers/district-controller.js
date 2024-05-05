const District = require("../models/districtSchema.js");

const districtCreate = async (req, res) => {
  try {
    const { district, provinceId } = req.body;

    if (!district) {
      return res.status(400).json({ error: "District is required" });
    }
    if (!provinceId) {
      return res.status(400).json({ error: "Province Id is required" });
    }
    const existingDistrict = await District.findOne({ district });

    if (existingDistrict) {
      return res.status(400).json({ error: "District already exists" });
    }

    // Create new district
    const createDistrict = new District({
      district,
      provinceId,
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
    let district = await District.find().populate("provinceId");
    if (district.length > 0) {
      res.send(district);
    } else {
      res.send({ message: "No District found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { districtCreate, allDistrict };
