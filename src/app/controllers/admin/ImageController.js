

const db = require('../../models');

const show_list_image = async (rep, res, next) => {
    res.render('admin/image/show_list_image', { layout: 'admin' })
}

module.exports = {
    show_list_image
};
