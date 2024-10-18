const express = require("express");
const router = express.Router();
const multer = require('multer');
const {getImages, getImage, addImage, updateImage, deleteImage} = require('../controllers/image.controller.js');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Obtém a extensão original
        const fileName = path.basename(file.originalname, ext); // Obtém o nome do arquivo sem a extensão
        cb(null, fileName + '-' + Date.now() + ext); // Salva com nome + timestamp + extensão
    }
});

const upload = multer({ storage: storage });

// Get all images
router.get('/', getImages);
// Get image by id
router.get("/:id", getImage);
// Add image
router.post('/', upload.single('file'), addImage);
// Update image
router.put('/:id', updateImage);
// Delete image
router.delete('/:id', deleteImage);

module.exports = router;