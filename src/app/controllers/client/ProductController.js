const { underscoredIf } = require('sequelize/lib/utils')
let db = require('../../models')
const { where } = require('sequelize')
const { Op } = require("sequelize"); // Đảm bảo đã import Op

let show_list_product = async (req, res) => {
    try {
        let getAllCategory = await db.category.findAll({
            raw: true
        })
        // console.log(getAllCategory)

        let limit = 6;

        var getAllProducts = await db.product.findAll({
            limit,
            raw: true,
        })

        const processedProducts = getAllProducts.map(product => {
            let price = product.price;
            let discount_percentage = product.discount_percentage;
            let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price;

            //Convert price to VND
            formatPrice = price.toLocaleString('vi-VN') + ' đ';

            //Convert sale_price to VND
            formatSale_price = sale_price.toLocaleString('vi-VN') + ' đ';

            return {
                ...product,
                price: formatPrice,
                sale_price: formatSale_price,
            }
        })

        // console.log(processedProducts)

        res.render('users/san-pham',
            {
                category: getAllCategory,
                products: processedProducts
            }
        )
        // return res.send('page product')
    } catch (error) {
        return res.status(500).json(error);
    }
}

let filterProductByCategory = async (req, res) => {
    try {
        let { category_id, min_price, max_price, sort_by, page, limit } = req.query;
        console.log(req.query)
        let whereCondition = {};
        let orderCondition = [];

        //Lọc theo danh mục
        if (!isNaN(category_id) && Number(category_id) > 0) {
            whereCondition.category_id = category_id;
        }

        //Lọc theo giá
        min_price = min_price ? Number(min_price) : null; // Chuyển đổi sang số
        max_price = max_price ? Number(max_price) : null; // Chuyển đổi sang số

        // Kiểm tra nếu có giá trị min và max, thiết lập điều kiện lọc
        if (min_price !== null && max_price !== null) {
            whereCondition.price = { [Op.between]: [min_price, max_price] };
        } else if (min_price !== null) {
            whereCondition.price = { [Op.gte]: min_price };
        } else if (max_price !== null) {
            whereCondition.price = { [Op.lte]: max_price };
        }

        // Lọc theo sản phẩm
        if (sort_by === "price-asc") {
            orderCondition.push(["price", "ASC"]);
        } else if (sort_by === "price-desc") {
            orderCondition.push(["price", "DESC"]);
        } else if (sort_by === "alpha-asc") {
            orderCondition.push(["name", "ASC"]);
        } else if (sort_by === "alpha-desc") {
            orderCondition.push(["name", "DESC"]);
        } else if (sort_by === "created-asc") {
            orderCondition.push(["created_date", "ASC"]);
        } else if (sort_by === "created-desc") {
            orderCondition.push(["created_date", "DESC"]);
        }

        // Xử lý phân trang
        page = parseInt(page) || 1; // Trang mặc định = 1
        limit = parseInt(limit) || 6; // Số sản phẩm trên mỗi trang
        let offset = (page - 1) * limit;

        let getAllProductsByLimit = await db.product.findAll({
            where: whereCondition,
            order: orderCondition,
            offset,
            limit,
            raw: true
        })
        // console.log('So luong phan tu nhan duoc: ', getAllProducts);

        let processedProducts = getAllProductsByLimit.map(product => {
            let price = product.price;
            let discount_percentage = product.discount_percentage;
            let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price;

            //Convert price to VND
            formatPrice = price.toLocaleString('vi-VN') + ' đ';

            //Convert sale_price to VND
            formatSale_price = sale_price.toLocaleString('vi-VN') + ' đ';

            return {
                ...product,
                price: formatPrice,
                sale_price: formatSale_price,
            }
        })

        let getAllProducts = await db.product.findAll({
            where: whereCondition,
            order: orderCondition,
            raw: true
        })

        let count = getAllProducts.length;
        console.log('So luong phan tu nhan duoc: ', count)

        // 📌 6️⃣ Tính tổng số trang
        const totalPages = Math.ceil(count / limit);
        console.log('So trang: ', totalPages)

        return res.json({
            products: processedProducts,
            totalItems: count,
            totalPages,
            currentPage: page,
            perPage: limit
        });

    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    show_list_product,
    filterProductByCategory
}