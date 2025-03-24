const express = require('express');
const router = express.Router();

const newsletterController = require('../../../app/controllers/admin/NewsletterController');

router.get('/sendMail', newsletterController.sendMail);

router.get('/delete_newsletter/:email', newsletterController.delete_newsletter);

router.get('/', newsletterController.show_list_newsletter);

module.exports = router;
