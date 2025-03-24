const express = require('express');
const router = express.Router();
const upload = require('../../../app/services/handle_multer');

const imageController = require('../../../app/controllers/admin/ImageController');

router.get('/', imageController.show_list_image);

router.post('/post_image', upload.single("image"), imageController.post_image);

router.get('/delete_image', upload.single("image"), imageController.delete_image);

module.exports = router;