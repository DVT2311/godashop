const express = require('express');
const router = express.Router();

const shipping_feeController = require('../../../app/controllers/admin/Shipping_FeeController');

router.get('/add_shipping_fee', shipping_feeController.add_shipping_fee);

router.get('/', shipping_feeController.show_list_shipping_fee);

module.exports = router;
