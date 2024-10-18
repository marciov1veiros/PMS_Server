const Image = require('../models/image.model');

/*const getImages = async (req, res) => {
    try {
        res.status(200).sendFile('/images/IHC-1-1729261106807.png', { root: '.' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}*/ //Caso seja necessario

// Get all images
const getImages = async (req, res) => {
    try {
        const images = await Image.find({});
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Get image by id
const getImage = async (req, res) => {
    try {
        const {id} = req.params
        const image = await Image.findById(id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// Add image
const addImage = async (req, res) => {
    try {
        const image = await Image.create({
            path: req.file.filename,
        });
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update image
const updateImage = async (req,res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByIdAndUpdate(id, req.body);
        if (!image){
            return res.status(404).json({message: "Image not found"});
        }
        const updatedImage = await Image.findById(id);
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete image
const deleteImage = async (req,res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByIdAndDelete(id);
        if (!image){
            return res.status(404).json({message: "Image not found"});
        }
        res.status(200).json({message: "Image deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getImages,
    getImage,
    addImage,
    updateImage,
    deleteImage
}