const express = require('express');
const router = express.Router();

const permissionController = require('../../../app/controllers/admin/PermissionController');

router.post('/post_edit_action', permissionController.post_edit_action);

router.get('/edit_action', permissionController.edit_action);

router.post('/post_action', permissionController.post_action);

router.get('/add_action', permissionController.add_action);

router.get('/actions', permissionController.show_actions);

router.get('/delete_role', permissionController.delete_role);

router.post('/post_edit_role', permissionController.post_edit_role);

router.get('/edit_role', permissionController.edit_role);

router.post('/post_role', permissionController.post_role);

router.get('/add_role', permissionController.add_role);

router.get('/', permissionController.show_list_role);

module.exports = router;
