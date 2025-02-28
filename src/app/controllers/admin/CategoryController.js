

const db = require('../../models');

const show_list_category = async (rep, res, next) => {
    res.render('admin/category/show_list_category', { layout: 'admin' })
}

const add_category = async (rep, res, next) => {
    res.render('admin/category/add_category', { layout: 'admin' })
}

module.exports = {
    show_list_category,
    add_category
};
