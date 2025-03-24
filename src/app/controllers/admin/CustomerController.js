

const db = require('../../models');
const bcrypt = require("bcrypt");

const show_list_customer = async (req, res, next) => {
    let Customer = await db.customer.findAll({
        raw: true,
    })
    res.render('admin/customer/show_list_customer', {
        data: Customer,
        username: req.session.user.username,
        layout: 'admin'
    })
}

const add_customer = async (req, res, next) => {
    let province = await db.province.findAll({
        raw: true,
    })
    res.render('admin/customer/add_customer', {
        data_province: province,
        username: req.session.user.username,
        layout: 'admin'
    })
}


// API lấy danh sách districts theo province_id
let filter_districtByProvince = async (req, res) => {
    const { province_id } = req.params;
    try {
        let get_districts = await db.district.findAll({
            where: {
                province_id: province_id,
            },
            raw: true
        })
        if (!get_districts) {
            return res.status(500).json('Khong tim duoc cac quan huyen')
        }
        return res.json(get_districts)
    } catch (error) {
        return res.status(500).json(error);
    }
}

// API lấy danh sách wards theo district_id
let filter_wardByDistrict = async (req, res) => {
    const { district_id } = req.params;
    try {
        let get_wards = await db.ward.findAll({
            where: {
                district_id: district_id,
            },
            raw: true
        })
        if (!get_wards) {
            return res.status(500).json('Khong tim duoc cac xa/phuong')
        }
        return res.json(get_wards);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_customer = async (req, res) => {
    try {
        let customer = req.body;
        let plainPassword = req.body.password;
        const saltRounds = 3; // Số lần băm
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

        await db.customer.create({
            name: customer.fullname,
            password: hashedPassword,
            mobile: customer.mobile,
            email: customer.email,
            login_by: customer.login_by,
            ward_id: customer.ward,
            shipping_name: customer.shipping_name,
            shipping_mobile: customer.shipping_mobile,
            housenumber_street: customer.housenumber_street,
            is_active: customer.active,
        })

        let Customer = await db.customer.findAll({
            raw: true,
        })
        res.render('admin/customer/show_list_customer', {
            data: Customer,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let edit_customer = async (req, res) => {
    try {
        let idCustomer = req.query.id;
        let getCustomerById = await db.customer.findByPk(
            idCustomer,
            {
                raw: true
            }
        );

        let getWard = await db.ward.findByPk(getCustomerById.ward_id,
            {
                raw: true
            }
        );

        let getDistrict = await db.district.findByPk(getWard.district_id,
            {
                raw: true,
            }
        )

        let getProvince = await db.province.findByPk(getDistrict.province_id,
            {
                raw: true,
            }
        )

        let getAllDistrictById = await db.district.findAll({
            where: {
                province_id: getProvince.id
            },
            raw: true
        })

        let province = await db.province.findAll({
            raw: true,
        })

        res.render('admin/customer/edit_customer', {
            data: getCustomerById,
            data_WardById: getWard,
            data_DistrictById: getDistrict,
            data_ProvinceById: getProvince,
            data_AllDistrictById: getAllDistrictById,
            data_AllProvince: province,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_customer = async (req, res) => {
    try {
        let getCustomer = req.body;
        let customer = await db.customer.findByPk(getCustomer.id, {
            raw: true
        });
        console.log(customer)
        if (!customer) {
            return res.status(500).json('Khong ton tai Khach hang nay trong database!');
        }
        await db.customer.update({
            name: getCustomer.fullname,
            mobile: getCustomer.mobile,
            email: getCustomer.email,
            login_by: getCustomer.login_by,
            ward_id: getCustomer.ward_id,
            shipping_name: getCustomer.shipping_name,
            shipping_mobile: getCustomer.shipping_mobile,
            housenumber_street: getCustomer.housenumber_street,
        }, {
            where: {
                id: getCustomer.id,
            }
        }
        )
        let Customer = await db.customer.findAll({
            raw: true,
        })
        res.render('admin/customer/show_list_customer', {
            data: Customer,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

let delete_customer = async (req, res) => {
    try {
        let getCustomerById = await db.customer.findByPk(req.query.id,
            {
                raw: true,
            }
        );
        console.log(getCustomerById)
        if (!getCustomerById) {
            return res.status(500).json('Khong ton tai khach hang nay trong database')
        }
        await db.customer.destroy({
            where: {
                id: req.query.id,
            }
        })
        let Customer = await db.customer.findAll({
            raw: true,
        })
        res.render('admin/customer/show_list_customer', {
            data: Customer,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_customer,
    add_customer,
    filter_districtByProvince,
    filter_wardByDistrict,
    post_customer,
    edit_customer,
    post_edit_customer,
    delete_customer
};
