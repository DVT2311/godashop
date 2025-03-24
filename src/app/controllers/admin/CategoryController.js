

const db = require('../../models');

let show_list_category = async (req, res, next) => {
    try {
        let getCategory = await db.category.findAll({
            raw: true,
        })
        res.render('admin/category/show_list_category', {
            username: req.session.user.username,
            data: getCategory,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let add_category = async (req, res, next) => {
    res.render('admin/category/add_category', {
        username: req.session.user.username,
        layout: 'admin'
    })
}

let post_category = async (req, res) => {
    try {
        let data = req.body;
        await db.category.create({
            name: data.name,
        })
        let getCategory = await db.category.findAll({
            raw: true,
        })
        res.render('admin/category/show_list_category', {
            data: getCategory,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let edit_category = async (req, res) => {
    try {
        let getId = req.query.id;
        let getCategoryById = await db.category.findByPk(getId, {
            raw: true
        });
        res.render('admin/category/edit_category', {
            data: getCategoryById,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_category = async (req, res) => {
    try {
        let data = req.body;
        await db.category.update({
            name: data.name,
        },
            {
                where: {
                    id: data.id
                }
            })
        let getCategory = await db.category.findAll({
            raw: true,
        })
        res.render('admin/category/show_list_category', {
            data: getCategory,
            username: req.session.user.username,
            layout: 'admin',
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let delete_category = async (req, res) => {
    try {
        let getID = req.query.id;
        console.log(getID)
        await db.category.destroy({
            where: {
                id: getID
            }
        })
        let getCategory = await db.category.findAll({
            raw: true,
        })
        res.render('admin/category/show_list_category', {
            data: getCategory,
            username: req.session.user.username,
            layout: 'admin',
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_category,
    add_category,
    post_category,
    edit_category,
    post_edit_category,
    delete_category
};
