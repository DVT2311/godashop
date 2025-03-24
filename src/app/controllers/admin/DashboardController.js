

const db = require('../../models');

const show_dashboard = async (req, res, next) => {
    let getAllOrders = await db.order.findAll(
        {
            attributes: ['id', 'created_date', 'order_status_id', 'shipping_fullname', 'shipping_mobile', 'payment_method', 'shipping_housenumber_street', 'shipping_fee', 'delivered_date'],
            include: [
                {
                    model: db.customer,
                    as: 'customer',
                    attributes: ['name', 'mobile', 'email'],
                },
                {
                    model: db.staff,
                    as: 'staff',
                    attributes: ['name'],
                },
                {
                    model: db.order_item,
                    as: 'order_items',
                    attributes: ['total_price'],
                },
                {
                    model: db.status,
                    as: 'order_status',
                    attributes: ['description'],
                },
            ],
            raw: true,
            nest: true
        },
    )

    // console.log(getAllOrders)

    let handleOrders = getAllOrders.map((order) => {
        let shipping_fee = order.shipping_fee;
        let total_price = order.order_items.total_price;
        let total = shipping_fee + total_price;
        let payment_method = order.payment_method;
        let date = new Date(order.created_date);

        //Convert shipping_fee to VND
        if (shipping_fee) {
            var formatShipping_fee = shipping_fee.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        }

        if (total_price) {
            //Convert total_price to VND
            var formatTotal_Price = total_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        }

        if (total) {
            //Convert total to VND
            var formatTotal = total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        }

        if (payment_method) {
            payment_method = "COD"
        } else {
            payment_method = "BANK"
        }

        if (date) {
            var formattedDate = date.toLocaleString('sv-SE').replace('T', ' ');
        }
        return {
            ...order,
            shipping_fee: formatShipping_fee,
            total_price: formatTotal_Price,
            total: formatTotal,
            payment_method: payment_method,
            created_date: formattedDate,
        }
    })

    // console.log(handleOrders)
    console.log('DashBoard: ', req.session)
    res.render('admin/dashboard/show_dashboard', {
        data: handleOrders,
        username: req.session.user.username,
        layout: 'admin',
    })
};

module.exports = {
    show_dashboard
};
