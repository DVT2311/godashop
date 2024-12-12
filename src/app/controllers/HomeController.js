const Product = require('../models/view_product')
// const User = require('../models/user')

class HomeController {
    show(req, res, next) {
        Product.findAll()
            .then(products => {
                // Nhóm sản phẩm theo category
                const groupedProducts = products.reduce((acc, product) => {
                    if (!acc[product.category_id]) {
                        acc[product.category_id] = [];
                    }
                    acc[product.category_id].push(product);
                    return acc;
                }, {});

                // console.log(groupedProducts);
                res.send(groupedProducts)
                // res.render('index', { groupedProducts });

            })
            .catch(error => {
                console.log('error: ', error)
            })
    }
}

module.exports = new HomeController();