const express = require('express');
const router = express.Router();

const orderSatusController = require('../../../app/controllers/admin/OrderStatusController');

router.get('/', orderSatusController.show_list_order_status);

module.exports = router;
