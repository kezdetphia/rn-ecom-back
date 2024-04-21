const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  const userId = req.user.id; //middelware token
  console.log("addToCart req.user.id: ", req.user.id);
  console.log("addToCart req.body: ", req.body);

  const { cartItem, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId });

    if (cart) {
      const existingProduct = cart.products.find(
        (product) => product.cartItem.toString() === cartItem
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ cartItem, quantity });
      }

      await cart.save();
      res
        .status(200)
        .json("Product added to cart! ", cart, " -AddToCartController");
    } else {
      const newCart = new Cart({
        userId,
        products: [{ cartItem, quantity: quantity }],
      });
      await newCart.save();
      res
        .status(200)
        .json("Product added to cart! ", newCart, " -AddToCartController");
    }
  } catch (err) {
    res.status(500).json({ addToCartControllerError: err });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id; //middleware token

  try {
    const cart = await Cart.find({ userId: userId }).populate(
      "products.cartItem",
      "_id title supplier price imageUrl"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ getCartError: error });
  }
};

const deleteCartItem = async (req, res) => {
  const cartItemId = req.params.cartItem;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { "products._id": cartItemId },
      { $pull: { products: { _id: cartItemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cart item" });
  }
};

const decrementCartItem = async (req, res) => {
  const { userId, cartItem } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json("Cart not found");
    }

    const existingProduct = cart.products.find(
      (product) => product.cartItem.toString() === cartItem
    );

    if (!existingProduct) {
      return res.status(404).json("Product not found");
    }

    if (existingProduct.quantity === 1) {
      cart.products = cart.products.filter(
        (product) => product.cartItem.toString() !== cartItem
      );
    } else {
      existingProduct.quantity -= 1;
    }

    await cart.save();

    if (existingProduct === 1) {
      await Cart.updateOne({ userId }, { $pull: { products: { cartItem } } });
    }

    res.status(200).json("Product decremented from cart");
  } catch (err) {
    res.status(500).json({ addToCartError: err });
  }
};

module.exports = { addToCart, getCart, deleteCartItem, decrementCartItem };
