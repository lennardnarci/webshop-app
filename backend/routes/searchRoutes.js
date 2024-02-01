const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

router.get("/:query", searchController.searchProductsByName);

module.exports = router;
