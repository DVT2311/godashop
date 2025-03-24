

const db = require('../../models');

const show_list_order_status = async (req, res, next) => {
    let getAllStatus = await db.status.findAll(
        {
            raw: true
        }
    )
    res.render('admin/order_status/show_list_order_status', {
        data: getAllStatus,
        username: req.session.user.username,
        layout: 'admin'
    })
}

let edit_order_status = async (req, res) => {
    try {
        let getID = req.query.id;
        console.log(getID)
        let getStatusByID = await db.status.findByPk(getID,
            {
                raw: true
            }
        )
        res.render("admin/order_status/edit_order_status",
            {
                data: getStatusByID,
                username: req.session.user.username,
                layout: 'admin'
            }
        )
    } catch (error) {
        return res.status(500).json(error);
    }
}

let post_edit_order_status = async (req, res) => {
    try {
        let data = req.body;
        console.log(data)
        let getOrderStattusByID = await db.status.findByPk(data.id,
            {
                raw: true
            }
        )
        if (!getOrderStattusByID) {
            console.log(getOrderStattusByID)
            res.status(500).json('Order Status nay khong ton tai!')
        }
        await db.status.update(
            {
                description: data.fullname
            },
            {
                where: {
                    id: data.id
                }
            }
        )
        console.log('Cap nhap order_status thanh cong');
        res.redirect('/admin/order_status')
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_order_status,
    edit_order_status,
    post_edit_order_status
};
