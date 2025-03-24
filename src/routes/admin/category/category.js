const express = require('express');
const router = express.Router();

const categoryController = require('../../../app/controllers/admin/CategoryController');

router.get('/delete_category', categoryController.delete_category);

router.post('/post_edit_category', categoryController.post_edit_category);

router.get('/edit_category', categoryController.edit_category);

router.post('/post_category', categoryController.post_category);

router.get('/add_category', categoryController.add_category);

router.get('/', categoryController.show_list_category);

module.exports = router;
