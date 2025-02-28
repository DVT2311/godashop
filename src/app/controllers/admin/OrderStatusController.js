

const db = require('../../models');

const show_list_order_status = async (rep, res, next) => {
    res.render('admin/order_status/show_list_order_status', { layout: 'admin' })
}

module.exports = {
    show_list_order_status
};
