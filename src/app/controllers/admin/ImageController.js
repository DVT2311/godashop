

const db = require('../../models');

const show_list_image = async (rep, res, next) => {
    let getListImage = await db.image_item.findAll({
        raw: true
    })
    console.log(getListImage)
    res.render('admin/image/show_list_image', {
        data: getListImage,
        layout: 'admin'
    })
}

module.exports = {
    show_list_image
};
