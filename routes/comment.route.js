const express = require("express");
const router = express.Router();
const {getComments, getComment, addComment, updateComment, deleteComment, getCommentsCampaign} = require('../controllers/comment.controller.js');

// Get all products
router.get('/', getComments);
// Get product by id
router.get("/:id", getComment);
// Add product
router.post('/', addComment);
// Update product
router.put('/:id', updateComment);
// Delete product
router.delete('/:id', deleteComment);
// Get comments by campaign id
router.get("/campaign/:id", getCommentsCampaign);

module.exports = router;