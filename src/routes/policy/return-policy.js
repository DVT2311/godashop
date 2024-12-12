const express = require('express');
const router = express.Router();

// const siteController = require('../router/controllers/SiteController');
// newsController.index();

router.get('/', (req, res) => {
    res.render('chinh-sach-doi-tra');
});

module.exports = router;
