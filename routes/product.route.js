const express = require("express");
const Product = require("../models/product.model.js")
const router = express.Router();
const {getProducts, getProduct, addProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js');

// Get all products
router.get('/', getProducts);
// Get product by name
router.get("/:name", getProduct);
// Add product
router.post('/', addProduct);
// Update product
router.put('/:id', updateProduct);

// Delete product
router.delete('/:id', deleteProduct);

module.exports = router;