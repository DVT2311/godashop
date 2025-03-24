

const { configDotenv } = require('dotenv');
const db = require('../../models');
const bcrypt = require("bcrypt");
const { get } = require('../../../routes/client/home');
const { where } = require('sequelize');
const { raw } = require('mysql2');


const show_list_staff = async (req, res, next) => {
    let getAllStaff = await db.staff.findAll({
        include: { model: db.role, as: 'role' },
        raw: true,
        nest: true
    })
    res.render('admin/staff/show_list_staff', {
        data: getAllStaff,
        username: req.session.user.username,
        layout: 'admin'
    })
}

const add_staff = async (req, res, next) => {
    let getRole = await db.role.findAll({
        raw: true
    })
    res.render('admin/staff/add_staff', {
        data_role: getRole,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let post_staff = async (req, res) => {
    try {
        let data = req.body;
        let plainPassword = req.body.password;
        const saltRounds = 10; // Số lần băm
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        await db.staff.create({
            role_id: data.role_id,
            name: data.fullname,
            username: data.username,
            mobile: data.mobile,
            password: hashedPassword,
            email: data.email,
            is_active: data.is_active
        })
        let getAllStaff = await db.staff.findAll({
            include: { model: db.role, as: 'role' },
            raw: true,
            nest: true
        })
        res.render('admin/staff/show_list_staff', {
            data: getAllStaff,
            username: req.session.user.username,
            layout: 'admin'
        })
        // return res.send('okok post staff')
    } catch (error) {
        return res.status(500).json(error);
    }
}

let edit_staff = async (req, res) => {
    let getId = req.query.id;
    console.log(getId)
    let getStaffAndRoleById = await db.staff.findByPk(getId,
        {
            include: {
                model: db.role,
                as: 'role'
            },
            raw: true,
            nest: true
        },
    )

    let getAllRole = await db.role.findAll({
        raw: true
    })

    console.log(getStaffAndRoleById)
    console.log(getAllRole)

    res.render('admin/staff/edit_staff', {
        data: getStaffAndRoleById,
        data_role: getAllRole,
        username: req.session.user.username,
        layout: "admin"
    })
}

let post_edit_staff = async (req, res) => {
    let data = req.body;
    let getId = data.id;
    let plainPassword = req.body.password;
    if (plainPassword) {
        let saltRounds = 10; // Số lần băm
        var hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    }
    console.log(data)
    console.log(getId)
    let getStaffById = await db.staff.findByPk(getId,
        {
            raw: true
        }
    )
    if (!getStaffById) {
        return res.status(500).json('Khong ton tai nhan vien nay!')
    }
    console.log(getStaffById)
    if (plainPassword) {
        let saltRounds = 10; // Số lần băm
        var hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        await db.staff.update({
            role_id: data.role_id,
            name: data.fullname,
            username: data.username,
            mobile: data.mobile,
            password: hashedPassword,
            email: data.email,
            is_active: data.is_active
        }, {
            where: {
                id: getId
            }
        })
    }
    await db.staff.update({
        role_id: data.role_id,
        name: data.fullname,
        username: data.username,
        mobile: data.mobile,
        // password: hashedPassword,
        email: data.email,
        is_active: data.is_active
    }, {
        where: {
            id: getId
        }
    })
    res.redirect('/admin/staff')
}

let delete_staff = async (req, res) => {
    let getID = req.query.id;
    let getStaffByID = await db.staff.findByPk(getID,
        {
            raw: true
        }
    )
    if (!getStaffByID) {
        return res.status(500).json('Khong tom tai nhan vien nay!');
    }
    await db.staff.destroy({
        where: {
            id: getID,
        },
    })
    res.redirect('/admin/staff')
}

module.exports = {
    show_list_staff,
    add_staff,
    post_staff,
    edit_staff,
    post_edit_staff,
    delete_staff
};
