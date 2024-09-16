const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  deleteUser,
  updateUser,
  addToCart,
  getCart,
  purchaseProduct,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete", deleteUser);
router.put("/update", updateUser);
router.post("/:userId/cart", addToCart);
router.get("/:userId/cart", getCart);
router.post("/:userId/purchase", purchaseProduct);

module.exports = router;
