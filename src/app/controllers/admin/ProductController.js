

const db = require('../../models');

const show_list_product = async (req, res, next) => {
    try {
        // Lấy tất cả dữ liệu từ ViewProduct
        const products = await db.View_Product.findAll()

        const processedProducts = products.map(product => {
            const price = product.price
            const discount_percentage = product.discount_percentage
            const sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price
            // console.log(sale_price)
            return {
                ...product.dataValues,
                sale_price: sale_price
            }
        })
        // console.log(processedProducts)
        // res.send(processedProducts)
        res.render('admin/product/list_product',
            {
                layout: 'admin',
                products: processedProducts
            }
        )
    } catch (error) {
        console.error('error: ', error); // Ghi log lỗi
        res.status(500).send({ error: 'Failed to fetch products' }); // Phản hồi lỗi    
    }
}

const add_product = async (rep, res, next) => {
    res.render('admin/product/add_product', { layout: 'admin' })
}

module.exports = {
    show_list_product,
    add_product
};
