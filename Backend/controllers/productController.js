const Product = require("../models/productModel");

const getNextProductId = async () => {
  const lastProduct = await Product.findOne().sort({ productId: -1 });
  return lastProduct ? lastProduct.productId + 1 : 1;
};

const addProduct = async (req, res) => {
  try {
    const { name, title, price, category, image } = req.body;
    const productId = await getNextProductId();
    const newProduct = new Product({
      productId,
      name,
      title,
      price,
      category,
      image,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", productId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, title, price, category, image } = req.body;
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (name) product.name = name;
    if (title) product.title = title;
    if (price) product.price = price;
    if (category) product.category = category;
    if (image) product.image = image;
    await product.save();
    res.json({ message: "Product updated successfully", productId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.deleteOne({ productId });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };
