const db = require('../../models');

const show = async (req, res, next) => {
    try {
        // Lấy tất cả dữ liệu từ ViewProduct
        db.View_Product.findAll()
            .then((products) => {
                const groupedProducts = products.reduce((acc, product) => {
                    if (!acc[product.category_id]) {
                        acc[product.category_id] = []
                    }
                    acc[product.category_id].push(product)
                    return acc;
                }, {})
                res.render('users/index', { categories: groupedProducts })
                // res.send('okok')
            })
            .catch((err) => {
                console.error('Lỗi khi lấy dữ liệu:', err);
            });
    } catch (error) {
        console.error('error: ', error); // Ghi log lỗi
        res.status(500).send({ error: 'Failed to fetch products' }); // Phản hồi lỗi    
    }
    // res.send('ok')   
};

module.exports = {
    show,
};
