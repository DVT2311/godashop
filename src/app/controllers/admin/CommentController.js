

const db = require('../../models');

const show_list_comment = async (rep, res, next) => {
    res.render('admin/comment/show_list_comment', { layout: 'admin' })
}

module.exports = {
    show_list_comment
};
