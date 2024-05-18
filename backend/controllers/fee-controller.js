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
const getAllFee = async (req, res) => {
  try {
    const fees = await Fee.find({ session: req.params.id })
      .populate("session")
      .populate("sclass");
    if (fees) {
      return res.send(fees);
    } else {
      return res.send({ message: "No Fees found" });
    }
  } catch (error) {
    console.error("Error retrieving fees:", error);
    return res.send(error);
  }
};
module.exports = { AddFee, getAllFee };
