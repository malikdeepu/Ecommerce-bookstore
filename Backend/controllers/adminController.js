const Admin = require("../models/adminModel");

const getNextAdminId = async () => {
  const lastAdmin = await Admin.findOne().sort({ adminId: -1 });
  return lastAdmin ? lastAdmin.adminId + 1 : 1;
};

const signup = async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists." });
    }
    const adminId = await getNextAdminId();
    const newAdmin = new Admin({ adminId, adminName, email, password });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully", adminId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", adminId: admin.adminId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };
