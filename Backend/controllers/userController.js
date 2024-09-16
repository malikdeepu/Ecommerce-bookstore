const User = require("../models/userModel");
const Product = require("../models/productModel");

const getNextUserId = async () => {
  const lastUser = await User.findOne().sort({ userId: -1 });
  return lastUser ? lastUser.userId + 1 : 1;
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const userId = await getNextUserId();
    const newUser = new User({ userId, username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Login successful", userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ email });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, newUsername, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (newUsername) user.username = newUsername;
    if (newPassword) user.password = newPassword;
    await user.save();
    res.json({ message: "User updated successfully", userId: user.userId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }
    if (user.cart.includes(productId)) {
      return res.status(400).json({ message: "Product already in cart" });
    }
    user.cart.push(productId);
    await user.save();
    res.json({ message: "Product added to cart successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const purchaseProduct = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or Product not found" });
    }
    if (!user.cart.includes(productId)) {
      return res.status(400).json({ message: "Product not in cart" });
    }
    if (!user.purchasedProducts.includes(productId)) {
      user.purchasedProducts.push(productId);
    }
    user.cart = user.cart.filter((id) => id.toString() !== productId);
    await user.save();
    res.json({ message: "Product purchased successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
  updateUser,
  addToCart,
  getCart,
  purchaseProduct,
};
