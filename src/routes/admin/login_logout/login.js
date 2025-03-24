const express = require('express');
const router = express.Router();

const LoginController = require('../../../app/controllers/admin/LoginController');

router.post('/login', LoginController.check_login);

// router.get('/me/getUserInfo', LoginController.getUserInfo);

router.get('/', LoginController.login);

module.exports = router;