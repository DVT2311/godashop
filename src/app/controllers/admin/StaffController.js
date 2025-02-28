

const db = require('../../models');

const show_list_staff = async (rep, res, next) => {
    res.render('admin/staff/show_list_staff', { layout: 'admin' })
}

const add_staff = async (rep, res, next) => {
    res.render('admin/staff/add_staff', { layout: 'admin' })
}

module.exports = {
    show_list_staff,
    add_staff
};
