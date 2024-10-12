const express = require("express");
const router = express.Router();
const {getVideos, getVideo, addVideo, updateVideo, deleteVideo} = require('../controllers/videos.controller');

// Get all videos
router.get('/', getVideos);
// Get video by id
router.get("/:id", getVideo);
// Add video
router.post('/', addVideo);
// Update video
router.put('/:id', updateVideo);
// Delete video
router.delete('/:id', deleteVideo);

module.exports = router;