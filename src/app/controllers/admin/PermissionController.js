

const { where } = require('sequelize');
const db = require('../../models');

const show_list_role = async (req, res, next) => {
    try {
        let getRole = await db.role.findAll({
            raw: true
        })
        res.render('admin/permission/show_list_role', {
            data: getRole,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

const add_role = async (req, res, next) => {
    res.render('admin/permission/add_role', {
        username: req.session.user.username,
        layout: 'admin'
    })
}

let post_role = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        await db.role.create({
            name: data.fullname,
        })
        res.redirect('/admin/permission');

    } catch (error) {
        return res.status(500).json(error);
    }
}

let edit_role = async (req, res) => {
    try {
        let getID = req.query.id;
        let getRoleByID = await db.role.findByPk(getID,
            {
                raw: true
            }
        );
        res.render('admin/permission/edit_role', {
            data: getRoleByID,
            username: req.session.user.username,
            layout: 'admin'
        })
        // return res.send('okok edit page role')
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_role = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        let getRoleByID = await db.role.findByPk(data.id, {
            raw: true
        })
        console.log(getRoleByID)
        if (!getRoleByID) {
            return res.status(500).send('Khong ton tai role nay!')
        }
        await db.role.update(
            {
                name: data.fullname
            },
            {
                where: {
                    id: data.id
                }
            }
        )
        res.redirect('/admin/permission');
    } catch (error) {
        return res.status(500).json(error);
    }
}

let delete_role = async (req, res) => {
    try {
        let getID = req.query.id;
        console.log(getID)
        let getRoleByID = await db.role.findByPk(getID,
            {
                raw: true
            }
        );
        console.log(getRoleByID)

        if (!getRoleByID) {
            return res.status(500).send('Khong ton tai role nay!')
        }
        await db.role.destroy(
            {
                where: {
                    id: getID
                }
            }
        )
        res.redirect('/admin/permission');
    } catch (error) {
        return res.status(500).json(error);
    }
}

const show_actions = async (req, res, next) => {
    let getAllAction = await db.action.findAll(
        {
            raw: true
        }
    )
    res.render('admin/permission/show_list_actions', {
        data: getAllAction,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let add_action = async (req, res) => {
    try {
        res.render('admin/permission/add_action',
            {
                username: req.session.user.username,
                layout: 'admin'
            }
        )
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_action = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        const getActionbyName = await db.action.findOne(
            {
                where: {
                    name: data.name
                },
                raw: true
            }
        )
        if (getActionbyName) {
            console.log(getActionbyName)
            await db.action.update(
                {
                    name: data.name,
                    description: data.fullname
                },
                {
                    where: {
                        name: data.name
                    }
                }
            )
            console.log('Action nay da ton tai, da cap nhap')
            res.redirect('/admin/permission/actions');
        }
        else {
            await db.action.create(
                {
                    name: data.name,
                    description: data.fullname
                }
            )
            console.log('Tao action thanh cong')
            res.redirect('/admin/permission/actions');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

let edit_action = async (req, res) => {
    try {
        let getID = req.query.id;
        console.log(getID)
        let getActionByID = await db.action.findByPk(getID,
            {
                raw: true
            }
        )
        console.log(getActionByID)
        if (!getActionByID) {
            return res.status(500).json('Khong ton tai Action nay!')
        }
        res.render('admin/permission/edit_action', {
            data: getActionByID,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_action = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        await db.action.update(
            {
                name: data.name,
                description: data.fullname
            },
            {
                where: {
                    name: data.name
                }
            }
        )
        console.log('Cap nhap thanh cong')
        res.redirect('/admin/permission/actions');
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_role,
    add_role,
    post_role,
    edit_role,
    post_edit_role,
    delete_role,
    show_actions,
    add_action,
    post_action,
    edit_action,
    post_edit_action
};
