

const db = require('../../models');

const show_list_newsletter = async (rep, res, next) => {
    res.render('admin/newsletter/show_list_newsletter', { layout: 'admin' })
}

const sendMail = async (rep, res, next) => {
    res.render('admin/newsletter/sendMail', { layout: 'admin' })
}

module.exports = {
    show_list_newsletter,
    sendMail
};
