const express = require('express');
const router = express.Router();

const newsletterController = require('../../../app/controllers/admin/NewsletterController');

router.get('/sendMail', newsletterController.sendMail);

router.get('/', newsletterController.show_list_newsletter);

module.exports = router;
