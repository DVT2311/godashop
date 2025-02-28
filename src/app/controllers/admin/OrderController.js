

const db = require('../../models');

const show_list_order = async (rep, res, next) => {
    res.render('admin/order/show_list_order', { layout: 'admin' })
}

const add_order = async (rep, res, next) => {
    res.render('admin/order/add_order', { layout: 'admin' })
}

module.exports = {
    show_list_order,
    add_order
};
