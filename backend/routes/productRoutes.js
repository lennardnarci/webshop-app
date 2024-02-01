const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

router.get("/:id", productsController.getProductById);

module.exports = router;
