const express = require('express');
const router = express.Router();

const permissionController = require('../../../app/controllers/admin/PermissionController');

router.get('/actions', permissionController.show_actions);

router.get('/add_role', permissionController.add_role);

router.get('/', permissionController.show_list_role);

module.exports = router;
