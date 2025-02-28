

const db = require('../../models');

const show_dashboard = async (req, res, next) => {
    res.render('admin/dashboard/show_dashboard', { layout: 'admin' })
};

module.exports = {
    show_dashboard
};
