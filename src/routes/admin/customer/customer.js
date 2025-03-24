const express = require('express');
const router = express.Router();

const customerController = require('../../../app/controllers/admin/CustomerController');

router.get('/add_customer', customerController.add_customer);

router.get('/', customerController.show_list_customer);

router.get('/districts/:province_id', customerController.filter_districtByProvince);

router.get('/wards/:district_id', customerController.filter_wardByDistrict);

router.post('/post_customer', customerController.post_customer);

router.get('/edit_customer', customerController.edit_customer);

router.post('/post_edit_customer', customerController.post_edit_customer);

router.get('/delete_customer', customerController.delete_customer);


module.exports = router;
