const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();
  if (!products.length) {
    return res.status(400).json({ message: "No products found" });
  }
  res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;

  // Check if fields are empty.
  if (!productName || !productDescription || !productPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and save a new product
  const product = await Product.create({
    productName,
    productDescription,
    productPrice,
  });

  if (product) {
    // Product created
    return res
      .status(201)
      .json({ message: `New product created: ${product.id}` });
  } else {
    return res.status(400).json({ message: "Invalid product data received" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id, productName, productDescription, productPrice } = req.body;

  if (!id || !productName || !productDescription || !productPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  product.productName = productName;
  product.productDescription = productDescription;
  product.productPrice = productPrice;

  const updatedProduct = await product.save();

  res.json({ message: `Product: ${updatedProduct.id} updated` });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Product ID required" });
  }

  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  const result = await product.deleteOne();

  const reply = `Product: ${result._id} deleted`;

  res.json({ message: reply });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
