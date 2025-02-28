const express = require('express');
const router = express.Router();

const staffController = require('../../../app/controllers/admin/StaffController');

router.get('/add_staff', staffController.add_staff);

router.get('/', staffController.show_list_staff);

module.exports = router;
