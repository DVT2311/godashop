const express = require('express');
const router = express.Router();

const commentController = require('../../../app/controllers/admin/CommentController');

router.get('/', commentController.show_list_comment);

module.exports = router;
