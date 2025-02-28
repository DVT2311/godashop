const express = require('express');
const router = express.Router();

const orderController = require('../../../app/controllers/admin/OrderController');

router.get('/add_order', orderController.add_order);

router.get('/', orderController.show_list_order);

module.exports = router;
