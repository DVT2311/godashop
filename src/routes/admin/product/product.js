const express = require('express');
const router = express.Router();
const upload = require('../../../app/services/handle_multer')


const productController = require('../../../app/controllers/admin/ProductController');

router.get('/', productController.show_list_product);

router.post('/post_product', upload.single("featured_image"), productController.post_product);

router.get('/add_product', productController.add_product);

router.get('/edit_product', productController.edit_product);

router.post('/update_product', upload.single("featured_image"), productController.update_product);

router.get('/delete_product', upload.single("featured_image"), productController.delete_product);

module.exports = router;
