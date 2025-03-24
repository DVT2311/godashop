const loginRouter = require('./login_logout/login');
const logoutRouter = require('./login_logout/logout');
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
const authService = require('../../app/services/authService');


function route(app) {
    app.use('/admin/newsletter', authService, newsletterRouter);

    app.use('/admin/order_status', authService, orderStatusRouter);

    app.use('/admin/permission', authService, permissionRouter);

    app.use('/admin/staff', authService, staffRouter);

    app.use('/admin/shipping_fee', authService, shippingFeeRouter);

    app.use('/admin/promotion', authService, promotionRouter);

    app.use('/admin/category', authService, categoryRouter);

    app.use('/admin/customer', authService, customerRouter);

    app.use('/admin/image', authService, imageRouter);

    app.use('/admin/comment', authService, commentRouter);

    app.use('/admin/order', authService, orderRouter);

    app.use('/admin/product', authService, productRouter);

    app.use('/admin/dashboard', authService, dashboardRouter);

    app.use('/admin/logout', logoutRouter);

    app.use('/admin', loginRouter);

}

module.exports = route;    
