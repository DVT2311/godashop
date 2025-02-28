const express = require('express');
const router = express.Router();

const categoryController = require('../../../app/controllers/admin/CategoryController');

router.get('/add_category', categoryController.add_category);

router.get('/', categoryController.show_list_category);

module.exports = router;
