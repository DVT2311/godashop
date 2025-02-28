

const db = require('../../models');

const show_list_role = async (rep, res, next) => {
    res.render('admin/permission/show_list_role', { layout: 'admin' })
}

const add_role = async (rep, res, next) => {
    res.render('admin/permission/add_role', { layout: 'admin' })
}

const show_actions = async (rep, res, next) => {
    res.render('admin/permission/actions', { layout: 'admin' })
}

module.exports = {
    show_list_role,
    add_role,
    show_actions
};
