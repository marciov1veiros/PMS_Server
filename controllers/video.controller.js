const Video = require('../models/video.model');

// Get all videos
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get video by id
const getVideo = async (req, res) => {
    try {
        const {id} = req.params
        const video = await Video.findById(id);
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add video
const addVideo = async (req, res) => {
    try {
        const video = await Video.create({
            path: req.file.filename,
        });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update video
const updateVideo = async (req,res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndUpdate(id, req.body);
        if (!video){
            return res.status(404).json({message: "Video not found"});
        }
        const updatedVideo = await Video.findById(id);
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete video
const deleteVideo = async (req,res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndDelete(id);
        if (!video){
            return res.status(404).json({message: "Video not found"});
        }
        res.status(200).json({message: "Video deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getVideos,
    getVideo,
    addVideo,
    updateVideo,
    deleteVideo
}