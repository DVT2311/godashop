const express = require('express');
const router = express.Router();

const promotionController = require('../../../app/controllers/admin/PromotionController');

router.get('/add_promotion', promotionController.add_promotion);

router.get('/', promotionController.show_list_promotion);

module.exports = router;
