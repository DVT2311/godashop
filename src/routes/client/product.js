const express = require('express');
const router = express.Router();

const productController = require('../../app/controllers/client/ProductController');

router.get('/filter-product', productController.filterProductByCategory)

router.get('/', productController.show_list_product)

module.exports = router;
