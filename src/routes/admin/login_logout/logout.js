const express = require('express');
const router = express.Router();

const logoutController = require('../../../app/controllers/admin/LogoutController');


router.get('/', logoutController.logout);

module.exports = router;