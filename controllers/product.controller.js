const Product = require('../models/product.model');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get product by name
const getProduct = async (req, res) => {
    try {
        const {name} = req.params
        const products = await Product.find({name});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add product
const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update product
const updateProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const produtct = await Product.findByIdAndUpdate(id, req.body);
        if (!produtct){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete product
const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const produtct = await Product.findByIdAndDelete(id);
        if (!produtct){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}