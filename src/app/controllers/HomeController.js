// const { Product } = require('../models/ViewProduct')

// const show = async (req, res, next) => {
//     const products = await Product.findAll(); // Truy vấn tất cả sản phẩm
//     try {
//         // Nhóm sản phẩm theo category
//         const groupedProducts = products.reduce((acc, product) => {
//             if (!acc[product.category_id]) {
//                 acc[product.category_id] = [];
//             }
//             acc[product.category_id].push(product);
//             return acc;
//         }, {});

//         // console.log(groupedProducts);
//         res.send(groupedProducts)
//         // res.render('index', { groupedProducts });

//     }
//     catch {
//         console.log('error: ', error)
//     }
// }


// module.exports = {
//     show: show,
// }

const db = require('../models');
// console.log(db)

const show = async (req, res, next) => {
    try {
        // Lấy tất cả dữ liệu từ ViewProduct
        db.View_Product.findAll()
            .then((products) => {
                // console.log(products); // Trả về mảng các sản phẩm
                res.send(products)
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
