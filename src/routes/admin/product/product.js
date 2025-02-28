const express = require('express');
const router = express.Router();

const productController = require('../../../app/controllers/admin/ProductController');

router.get('/add_product', productController.add_product);

router.get('/', productController.show_list_product);

module.exports = router;
