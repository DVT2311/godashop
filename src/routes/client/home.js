const express = require('express');
const router = express.Router();

const homeController = require('../../app/controllers/client/HomeController');

router.get('/', homeController.show);

module.exports = router;
