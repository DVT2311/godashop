const express = require('express');
const router = express.Router();

// const siteController = require('../app/controllers/SiteController');
// newsController.index();

router.get('/', (req, res) => {
    res.render('users/lien-he')
})

module.exports = router;
