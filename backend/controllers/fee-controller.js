const Fee = require("../models/feeSchema");

const AddFee = async (req, res) => {
  try {
    const newFee = new Fee(req.body);
    const savedFee = await newFee.save();
    return res.send(savedFee);
  } catch (error) {
    console.error("Error adding fee:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getAllFee = async () => {
  try {
    const fees = await Fee.findOne();
    if (fees.length > 0) {
      return fees;
    } else {
      res.send({ message: "No Fees found" });
    }
  } catch (error) {
    console.error("Error retrieving fees:", error);
    throw error;
  }
};
module.exports = { AddFee, getAllFee };
