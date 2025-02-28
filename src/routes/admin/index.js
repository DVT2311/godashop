const dashboardRouter = require('./dashboard/dashboard');
const productRouter = require('./product/product');
const orderRouter = require('./order/order');
const commentRouter = require('./comment/comment');
const imageRouter = require('./image/image');
const customerRouter = require('./customer/customer');
const categoryRouter = require('./category/category');
const promotionRouter = require('./promotion/promotion');
const shippingFeeRouter = require('./shipping_fee/shipping_fee');
const staffRouter = require('./staff/staff');
const permissionRouter = require('./permission/permission');
const orderStatusRouter = require('./order_status/order_status');
const newsletterRouter = require('./newsletter/newsletter');

function route(app) {
    app.use('/admin/newsletter', newsletterRouter);

    app.use('/admin/order_status', orderStatusRouter);

    app.use('/admin/permission', permissionRouter);

    app.use('/admin/staff', staffRouter);

    app.use('/admin/shipping_fee', shippingFeeRouter);

    app.use('/admin/promotion', promotionRouter);

    app.use('/admin/category', categoryRouter);

    app.use('/admin/customer', customerRouter);

    app.use('/admin/image', imageRouter);

    app.use('/admin/comment', commentRouter);

    app.use('/admin/order', orderRouter);

    app.use('/admin/product', productRouter);

    app.use('/admin', dashboardRouter);

}

module.exports = route;    
