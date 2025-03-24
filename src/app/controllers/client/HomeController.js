const db = require('../../models');

const show = async (req, res, next) => {
    try {
        const productRepository = db.product;
        const categoryRepository = db.category;

        // 1️⃣ Lấy sản phẩm nổi bật (featuredProducts)
        let featuredProducts = await productRepository.findAll({
            where: { featured: true },
            order: [['featured', 'DESC']],
            limit: 4,
            raw: true
        });

        // 2️⃣ Lấy sản phẩm mới nhất (latestProducts)
        let latestProducts = await productRepository.findAll({
            order: [['created_date', 'DESC']],
            limit: 4,
            raw: true
        });

        // 3️⃣ Lấy tất cả danh mục
        let categories = await categoryRepository.findAll({ raw: true });

        // 4️⃣ Lấy sản phẩm theo từng danh mục
        let categoryProducts = {};
        for (let category of categories) {
            let products = await productRepository.findAll({
                where: { category_id: category.id },
                order: [['created_date', 'DESC']],
                limit: 4,
                raw: true
            });
            categoryProducts[category.name] = products;
        }

        // 5️⃣ Trả về dữ liệu JSON (hoặc render trang nếu có giao diện)
        res.render('users/index', {
            featuredProducts,
            latestProducts,
            categories,
            categoryProducts
        });

    } catch (error) {
        console.error('error: ', error); // Ghi log lỗi
        res.status(500).send({ error: 'Failed to fetch products' }); // Phản hồi lỗi        
    }
};

module.exports = {
    show,
};
