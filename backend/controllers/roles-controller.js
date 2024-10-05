const Role = require("../models/rolesSchema.js");

const rolesCreate = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || typeof role !== "string" || role.trim() === "") {
      return res
        .status(400)
        .json({ error: "Role is required and cannot be empty or null" });
    }

    const existingRole = await Role.findOne({ role });
    console.log(existingRole);

    if (existingRole) {
      return res.status(400).json({ error: "Role already exists" });
    }

    const createRole = new Role({
      role,
    });

    const result = await createRole.save();

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const allRoles = async (req, res) => {
  try {
    let roles = await Role.find();
    if (roles.length > 0) {
      res.send(roles);
    } else {
      res.send({ message: "No Roles found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteRoles = async (req, res) => {
  try {
    const id = req.params.id;

    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    await Role.findByIdAndDelete(id);

    return res.send({ message: "Role deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { rolesCreate, allRoles, deleteRoles };
