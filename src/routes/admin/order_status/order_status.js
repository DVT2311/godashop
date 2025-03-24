const express = require('express');
const router = express.Router();

const orderSatusController = require('../../../app/controllers/admin/OrderStatusController');

router.post('/post_edit_order_status', orderSatusController.post_edit_order_status);

router.get('/edit_order_status', orderSatusController.edit_order_status);

router.get('/', orderSatusController.show_list_order_status);

module.exports = router;
