

const { where } = require('sequelize');
const db = require('../../models');

let show_list_shipping_fee = async (req, res, next) => {
    try {
        let transport = await db.transport.findAll();
        let newData = await Promise.all(transport.map(async (data) => {
            let ProvinceById = await db.province.findByPk(data.province_id, {
                raw: true
            });
            return {
                id: ProvinceById.id,
                name: ProvinceById.name,
                price: data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            }
        }))

        res.render('admin/shipping_fee/show_list_shipping_fee', {
            data: newData,
            username: req.session.user.username,
            layout: 'admin'
        })

    } catch (error) {
        return res.status(500).json(error);
    }
}

let add_shipping_fee = async (req, res, next) => {
    let getProvince = await db.province.findAll({
        raw: true
    });
    res.render('admin/shipping_fee/add_shipping_fee', {
        data: getProvince,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let post_shipping_fee = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        console.log(data.province_id)
        let getProvinceById = await db.province.findByPk(
            data.province_id,
            {
                raw: true
            }
        );
        console.log(getProvinceById)

        if (getProvinceById) {
            await db.transport.update(
                {
                    price: data.price
                },
                {
                    where: {
                        id: data.province_id
                    }
                }
            )
            console.log('Cập nhập giá vận chuyển thành công')
        }
        else {
            await db.transport.create({
                province_id: getProvinceById.id,
                price: data.price
            })
            console.log('Tạo mới giá cho tỉnh thành mới')
        }

        let transport = await db.transport.findAll();
        let newData = await Promise.all(transport.map(async (data) => {
            let ProvinceById = await db.province.findByPk(data.province_id, {
                raw: true
            });
            return {
                id: ProvinceById.id,
                name: ProvinceById.name,
                price: data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            }
        }))

        res.render('admin/shipping_fee/show_list_shipping_fee', {
            data: newData,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error)
    }

}

let edit_shipping_fee = async (req, res) => {
    try {
        let getId = req.query.id;
        let getProvinceById = await db.province.findByPk(getId,
            {
                raw: true
            }
        );
        console.log(getProvinceById)
        let PriceTranspostByProvince = await db.transport.findOne({
            where: {
                province_id: getProvinceById.id,
            },
            raw: true
        })
        console.log(PriceTranspostByProvince)
        let AllProvince = await db.province.findAll({
            raw: true
        })
        console.log(AllProvince)
        res.render('admin/shipping_fee/edit_shipping_fee', {
            data_province: getProvinceById,
            data_price: PriceTranspostByProvince,
            data_AllProvince: AllProvince,
            username: req.session.user.username,
            layout: 'admin',
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_shipping_fee = async (req, res) => {
    try {
        let data = req.body;
        await db.transport.update(
            {
                price: data.price
            },
            {
                where: {
                    id: data.province_id
                }
            }
        )
        console.log('Cập nhập giá vận chuyển thành công')

        let transport = await db.transport.findAll();
        let newData = await Promise.all(transport.map(async (data) => {
            let ProvinceById = await db.province.findByPk(data.province_id, {
                raw: true
            });
            return {
                id: ProvinceById.id,
                name: ProvinceById.name,
                price: data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            }
        }))

        res.render('admin/shipping_fee/show_list_shipping_fee', {
            data: newData,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }

}

let delete_shipping_fee = async (req, res) => {
    try {
        let getId = req.query.id;
        await db.transport.destroy({
            where: {
                province_id: getId
            }
        })
        await db.province.destroy({
            where: {
                id: getId
            }
        })
        let transport = await db.transport.findAll();
        let newData = await Promise.all(transport.map(async (data) => {
            let ProvinceById = await db.province.findByPk(data.province_id, {
                raw: true
            });
            return {
                id: ProvinceById.id,
                name: ProvinceById.name,
                price: data.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
            }
        }))

        res.render('admin/shipping_fee/show_list_shipping_fee', {
            data: newData,
            username: req.session.user.username,
            layout: 'admin'
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_shipping_fee,
    add_shipping_fee,
    post_shipping_fee,
    edit_shipping_fee,
    post_edit_shipping_fee,
    delete_shipping_fee
};
