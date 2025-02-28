

const db = require('../../models');

const show_list_promotion = async (rep, res, next) => {
    res.render('admin/promotion/show_list_promotion', { layout: 'admin' })
}

const add_promotion = async (rep, res, next) => {
    res.render('admin/promotion/add_promotion', { layout: 'admin' })
}

module.exports = {
    show_list_promotion,
    add_promotion
};
