const express = require('express');
const router = express.Router();

const customerController = require('../../../app/controllers/admin/CustomerController');

router.get('/add_customer', customerController.add_customer);

router.get('/', customerController.show_list_customer);

module.exports = router;
