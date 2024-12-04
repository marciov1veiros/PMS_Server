const express = require("express");
const router = express.Router();
const multer = require('multer');
const {getVideos, getVideo, addVideo, updateVideo, deleteVideo, getVideosCampaign} = require('../controllers/video.controller');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'videos/'); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Obtém a extensão original
        const fileName = path.basename(file.originalname, ext); // Obtém o nome do arquivo sem a extensão
        cb(null, fileName + '-' + Date.now() + ext); // Salva com nome + timestamp + extensão
    }
});

const upload = multer({ storage: storage });

// Get all videos
router.get('/', getVideos);
// Get video by id
router.get("/:id", getVideo);
// Get image by campaign
router.get("/campaign/:id", getVideosCampaign);
// Add video
router.post('/', upload.single('file'), addVideo);
// Update video
router.put('/:id', updateVideo);
// Delete video
router.delete('/:id', deleteVideo);

module.exports = router;