const express = require("express");
const router = express.Router();
const {getImages, getImage, addImage, updateImage, deleteImage} = require('../controllers/imagens.controller.js');

// Get all images
router.get('/', getImages);
// Get image by id
router.get("/:id", getImage);
// Add image
router.post('/', addImage);
// Update image
router.put('/:id', updateImage);
// Delete image
router.delete('/:id', deleteImage);

module.exports = router;