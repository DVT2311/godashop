

const e = require('express');
const db = require('../../models');
const path = require('path');
const fs = require("fs");


let show_list_image = async (req, res, next) => {
    let getListImage = await db.image_item.findAll({
        raw: true
    })
    let data_product = await db.product.findAll({
        raw: true,
    })
    res.render('admin/image/show_list_image', {
        data: getListImage,
        data_product: data_product,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let post_image = async (req, res) => {
    try {
        let getId = req.body.product_id;
        let nameImage = req.file.filename;
        await db.image_item.create({
            product_id: getId,
            name: nameImage,
        })
        let getListImage = await db.image_item.findAll({
            raw: true
        })
        let data_product = await db.product.findAll({
            raw: true,
        })
        res.render('admin/image/show_list_image', {
            data: getListImage,
            data_product: data_product,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

let delete_image = async (req, res) => {
    try {
        let getId = req.query.id;
        let ItemImageById = await db.image_item.findOne({
            where: {
                id: getId,
            },
            raw: true
        })
        console.log(ItemImageById)
        if (!ItemImageById) {
            return res.status(500).send('Hinh nay khong ton tai trong database');
        }
        await db.image_item.destroy({
            where: {
                id: getId,
            },
        })
        console.log('Xoa thanh cong trong database')
        let ImagePath = path.join(__dirname, "../../../public/admin/images/", ItemImageById.name);
        console.log(ImagePath)
        if (fs.existsSync(ImagePath)) {
            fs.unlinkSync(ImagePath); // Xóa ảnh cũ
            console.log('Xoa hinh tren Server thanh cong')
        }
        else {
            console.log('Xoa hinh khong thanh cong')
        }

        let getListImage = await db.image_item.findAll({
            raw: true
        })
        let data_product = await db.product.findAll({
            raw: true,
        })
        res.render('admin/image/show_list_image', {
            data: getListImage,
            data_product: data_product,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    show_list_image,
    post_image,
    delete_image
};
