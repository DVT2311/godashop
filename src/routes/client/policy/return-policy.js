const express = require('express');
const router = express.Router();

// const siteController = require('../router/controllers/SiteController');
// newsController.index();

router.get('/', (req, res) => {
    console.log('okok')
    res.render('users/chinh-sach-doi-tra');
});

module.exports = router;
