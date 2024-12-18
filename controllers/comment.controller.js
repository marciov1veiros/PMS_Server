const Comment = require('../models/comment.model');

// Get all comments
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('campaign_id').populate('user_email');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get all comments from that Campaign
const getCommentsCampaign = async (req, res) => {
    try {
        const {id} = req.params
        const comments = await Comment.find({campaign_id: id }).populate('user_email');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get comment by id
const getComment = async (req, res) => {
    try {
        const {id} = req.params
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add comment
const addComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update comment
const updateComment = async (req,res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, req.body);
        if (!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        const updatedComment = await Comment.findById(id);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete comment
const deleteComment = async (req,res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        res.status(200).json({message: "Comment deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getComments,
    getCommentsCampaign,
    getComment,
    addComment,
    updateComment,
    deleteComment
}