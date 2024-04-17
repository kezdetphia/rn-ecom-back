const router = require("express").Router();

const {
  addToCart,
  getCart,
  deleteCartItem,
  decrementCartItem,
} = require("../controllers/CartController");

const { verifyToken } = require("../middleware/verifyToken");

// Get the user's shopping cart
router.get("/find", getCart);

// Add an item to the user's shopping cart
router.post("/", verifyToken, addToCart); // Add item to cart

// Delete an item from the user's shopping cart
router.delete("/:cartItemId", deleteCartItem);

// Decrement an item from the user's shopping cart
router.post("/quantity", decrementCartItem);

module.exports = router;
