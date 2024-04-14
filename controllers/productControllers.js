const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).json({
      message: "Product Created! (createProduct API)",
      data: newProduct,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create product! (createProduct API)" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get products! (getAllProducts API)" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get a single product! (getProduct API)" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $search: {
          index: "furniture",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to search product! (searchProduct API)" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  searchProduct,
};
