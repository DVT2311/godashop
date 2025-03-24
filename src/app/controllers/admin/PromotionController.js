

const db = require('../../models');

const show_list_promotion = async (req, res, next) => {
    res.render('admin/promotion/show_list_promotion', {
        username: req.session.user.username,
        layout: 'admin'
    })
}

const add_promotion = async (req, res, next) => {
    res.render('admin/promotion/add_promotion', {
        username: req.session.user.username,
        layout: 'admin'
    })
}

module.exports = {
    show_list_promotion,
    add_promotion
};
