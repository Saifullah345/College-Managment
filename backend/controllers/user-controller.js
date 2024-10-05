const User = require("../models/userSchema.js");

const createUser = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user || typeof user !== "string" || user.trim() === "") {
      return res
        .status(400)
        .json({ error: "User is required and cannot be empty or null" });
    }

    const existingUser = await User.findOne({ user });
    console.log(existingUser);

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      user,
    });

    const result = await newUser.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    if (users.length > 0) {
      res.send(users);
    } else {
      res.send({ message: "No Users found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(id);

    return res.send({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUser, getAllUsers, deleteUser };
