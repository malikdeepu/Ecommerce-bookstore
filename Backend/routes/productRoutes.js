const express = require("express");
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// POST - Add a new product
router.post("/", addProduct);

// GET - Get all products
router.get("/", getAllProducts);

// PUT - Update a product by productId
router.put("/:productId", updateProduct);

// DELETE - Delete a product by productId
router.delete("/:productId", deleteProduct);

module.exports = router;
