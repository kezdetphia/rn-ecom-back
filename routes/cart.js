const router = require("express").Router();

const {
  addToCart,
  getCart,
  deleteCartItem,
  decrementCartItem,
  updateCartItem,
} = require("../controllers/cartController");

const { verifyToken } = require("../middleware/verifyToken");

// Get the user's shopping cart
router.get("/find", verifyToken, getCart);

// Add an item to the user's shopping cart
router.post("/", verifyToken, addToCart); // Add item to cart

// Delete an item from the user's shopping cart
// router.delete("/:cartItemId", deleteCartItem);
router.delete("/:cartItem", deleteCartItem);

router.put("/update", verifyToken, updateCartItem);

// Decrement an item from the user's shopping cart
router.post("/quantity", decrementCartItem);

module.exports = router;
