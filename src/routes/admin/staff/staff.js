const express = require('express');
const router = express.Router();

const staffController = require('../../../app/controllers/admin/StaffController');

router.get('/delete_staff', staffController.delete_staff);

router.post('/post_edit_staff', staffController.post_edit_staff);

router.get('/edit_staff', staffController.edit_staff);

router.post('/post_staff', staffController.post_staff);

router.get('/add_staff', staffController.add_staff);

router.get('/', staffController.show_list_staff);

module.exports = router;
