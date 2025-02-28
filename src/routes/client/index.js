const homeRouter = require('./home');
const productRouter = require('./product');
const returnPolicyRouter = require('./policy/return-policy');
const paymentPolicyRouter = require('./policy/payment-policy');
const deliveryPolicyRouter = require('./policy/delivery-policy');
const contactRouter = require('./contact');

function route(app) {
    app.use('/lien-he', contactRouter);

    app.use('/chinh-sach-giao-hang', deliveryPolicyRouter);

    app.use('/chinh-sach-thanh-toan', paymentPolicyRouter);

    app.use('/chinh-sach-doi-tra', returnPolicyRouter);

    app.use('/san-pham', productRouter);

    app.use('/', homeRouter);
}

module.exports = route;    
