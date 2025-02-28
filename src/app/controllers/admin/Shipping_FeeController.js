

const db = require('../../models');

const show_list_shipping_fee = async (rep, res, next) => {
    res.render('admin/shipping_fee/show_list_shipping_fee', { layout: 'admin' })
}

const add_shipping_fee = async (rep, res, next) => {
    res.render('admin/shipping_fee/add_shipping_fee', { layout: 'admin' })
}

module.exports = {
    show_list_shipping_fee,
    add_shipping_fee
};
