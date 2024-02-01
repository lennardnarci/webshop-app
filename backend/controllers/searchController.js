const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const searchProductsByName = asyncHandler(async (req, res) => {
  const { query } = req.params;

  if (!query) {
    return res.status(400).json({ message: "Product name is required" });
  }

  try {
    const products = await Product.find({
      productName: { $regex: query, $options: "i" },
    }).lean();

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found", search: query });
    }

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { searchProductsByName };
