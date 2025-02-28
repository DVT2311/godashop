

const db = require('../../models');

const show_list_customer = async (rep, res, next) => {
    res.render('admin/customer/show_list_customer', { layout: 'admin' })
}

const add_customer = async (rep, res, next) => {
    res.render('admin/customer/add_customer', { layout: 'admin' })
}

module.exports = {
    show_list_customer,
    add_customer
};
