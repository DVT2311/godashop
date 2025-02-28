const express = require('express');
const router = express.Router();

const imageController = require('../../../app/controllers/admin/ImageController');

router.get('/', imageController.show_list_image);

module.exports = router;
