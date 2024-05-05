const Province = require("../models/provinceSchema.js");

const provincesCreate = async (req, res) => {
  try {
    const { province } = req.body;

    if (!province) {
      return res.status(400).json({ error: "Province is required" });
    }
    const existingProvince = await Province.findOne({ province });

    if (existingProvince) {
      return res.status(400).json({ error: "Province already exists" });
    }

    // Create new district
    const createProvince = new Province({
      province,
    });

    // Save district to database
    const result = await createProvince.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const allProvinces = async (req, res) => {
  try {
    let provinces = await Province.find();
    if (provinces.length > 0) {
      res.send(provinces);
    } else {
      res.send({ message: "No provinces found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { provincesCreate, allProvinces };
