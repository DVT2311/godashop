

const db = require('../../models');
const path = require('path');
const fs = require("fs");
const { where } = require('sequelize');
const upload = require('../../../app/services/handle_multer')


const show_list_product = async (req, res, next) => {
    try {
        // Lấy tất cả dữ liệu từ ViewProduct
        const products = await db.product.findAll()
        const processedProducts = products.map(product => {
            let price = product.price;
            let discount_percentage = product.discount_percentage;
            let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price;
            let date = new Date(product.created_date);


            //Convert price to VND
            formatPrice = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert sale_price to VND
            formatSale_price = sale_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert featured
            let featured = product.featured
            if (featured) {
                featured = "Có"
            }

            if (date) {
                var formattedDate = date.toLocaleString('sv-SE').replace('T', ' ');
            }
            return {
                ...product.dataValues,
                price: formatPrice,
                sale_price: formatSale_price,
                featured: featured,
                created_date: formattedDate,
            }
        })
        res.render('admin/product/list_product',
            {
                layout: 'admin',
                products: processedProducts,
                username: req.session.user.username,
            }
        )
    } catch (error) {
        console.error('error: ', error); // Ghi log lỗi
        res.status(500).send({ error: 'Failed to fetch products' }); // Phản hồi lỗi    
    }
}

const add_product = async (req, res, next) => {
    try {
        let list_category = await db.category.findAll({
            raw: true
        });
        let list_brand = await db.brand.findAll({
            raw: true
        });
        res.render('admin/product/add_product', {
            layout: 'admin',
            data_category: list_category,
            data_brand: list_brand,
            username: req.session.user.username,
        })
    } catch (e) {
        res.status(500).send(e);
    }
}

let post_product = async (req, res) => {
    let data = req.body;
    let featured_image = req.file;
    console.log(data)
    console.log(featured_image)
    // if (data && featured_image) {
    try {
        if (!req.file) {
            return res.status(500).send('Vui long chon anh');
        }
        let featured_image = req.file.filename;
        if (data.barcode && data.sku && data.name && data.price && data.inventory_qty && data.category && data.brand_id && data.created_date) {
            await db.product.create({
                barcode: data.barcode,
                sku: data.sku,
                name: data.name,
                price: data.price,
                discount_percentage: data.discount_percentage,
                discount_from_date: data.discount_from_date,
                discount_to_date: data.discount_to_date,
                inventory_qty: data.inventory_qty,
                category_id: data.category,
                brand_id: data.brand_id,
                created_date: data.created_date,
                featured: data.featured,
                featured_image: featured_image,
                description: data.description,
                star: data.star,
            })
        }
        else {
            res.status(500).send('Vui long nhap day du truong du lieu')
        }
        let products = await db.product.findAll({
            // raw: true
        });
        const processedProducts = products.map(product => {
            let price = product.price
            let discount_percentage = product.discount_percentage
            let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price

            //Convert price to VND
            formatPrice = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert sale_price to VND
            formatSale_price = sale_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert featured
            let featured = product.featured
            if (featured) {
                featured = "Có"
            }
            return {
                ...product.dataValues,
                price: formatPrice,
                sale_price: formatSale_price,
                featured: featured,
            }
        })
        res.render('admin/product/list_product',
            {
                layout: 'admin',
                products: processedProducts,
                username: req.session.user.username,
            })
        // return res.send('okok')
    } catch (e) {
        res.status(500).send(e);
    }
    //     }
    //     else {
    //         res.send('Kiem tra lai du lieu nhap vao')
    //     }
}

const edit_product = async (req, res, next) => {
    try {
        let list_product = await db.product.findOne({
            where: { id: req.query.id },
            raw: true
        });
        let list_category = await db.category.findAll({
            raw: true
        });
        let list_brand = await db.brand.findAll({
            raw: true
        });

        res.render('admin/product/edit_product', {
            layout: 'admin',
            data_product: list_product,
            data_category: list_category,
            data_brand: list_brand,
            username: req.session.user.username,
        })
    } catch (e) {
        res.status(500).send(e);
    }
}

let update_product = async (req, res) => {
    try {
        let data = req.body;
        let new_featured_image = req.file;
        let product = await db.product.findByPk(data.id, {
            raw: true
        });
        if (!product) {
            return res.status(500).json({ message: "San pham nay da khong duoc tim thay" })
        }
        // Nếu có ảnh mới -> Xóa ảnh cũ và cập nhật ảnh mới
        if (new_featured_image) {
            let oldImagePath = path.join(__dirname, "../../../public/admin/images/", product.featured_image);
            // console.log('San pham cu', oldImagePath)
            // console.log('San pham cu lay tu data', product.featured_image)
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
            }
            data.featured_image = new_featured_image.filename; // Lưu tên ảnh mới
        } else {
            data.featured_image = product.featured_image; // Giữ nguyên ảnh cũ nếu không có ảnh mới
        }
        // console.log('San pham moi', data.featured_image)
        // console.log('Danh sach san pham sau cung', data)

        await db.product.update(
            {
                barcode: data.barcode,
                sku: data.sku,
                name: data.name,
                price: data.price,
                discount_percentage: data.discount_percentage,
                discount_from_date: data.discount_from_date,
                discount_to_date: data.discount_to_date,
                inventory_qty: data.inventory_qty,
                category_id: data.category,
                brand_id: data.brand_id,
                created_date: data.created_date,
                featured: data.featured,
                featured_image: data.featured_image,
                description: data.description,
                star: data.star
            },
            {
                where: {
                    id: data.id
                }
            }
        )
        // Lấy tất cả dữ liệu từ ViewProduct
        const products = await db.product.findAll()

        const processedProducts = products.map(product => {
            let price = product.price
            let discount_percentage = product.discount_percentage
            let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price

            //Convert price to VND
            formatPrice = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert sale_price to VND
            formatSale_price = sale_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

            //Convert featured
            let featured = product.featured
            if (featured) {
                featured = "Có"
            }
            return {
                ...product.dataValues,
                price: formatPrice,
                sale_price: formatSale_price,
                featured: featured,
            }
        })
        res.render('admin/product/list_product',
            {
                layout: 'admin',
                products: processedProducts,
                username: req.session.user.username,
            }
        )

    } catch (e) {
        res.status(500).send(e);
    }
}

let delete_product = async (req, res) => {
    let getId = req.query.id;
    let Product = await db.product.findByPk(getId, {
        raw: true
    })
    let ImagePath = path.join(__dirname, "../../../public/admin/images/", Product.featured_image);
    if (fs.existsSync(ImagePath)) {
        fs.unlinkSync(ImagePath); // Xóa ảnh cũ
    }
    // return res.send('da xoa okok')
    await db.product.destroy({
        where: {
            id: getId
        }
    });
    // Lấy tất cả dữ liệu từ ViewProduct
    const products = await db.product.findAll()

    const processedProducts = products.map(product => {
        let price = product.price
        let discount_percentage = product.discount_percentage
        let sale_price = discount_percentage ? price * (1 - discount_percentage / 100) : price

        //Convert price to VND
        formatPrice = price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        //Convert sale_price to VND
        formatSale_price = sale_price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

        //Convert featured
        let featured = product.featured
        if (featured) {
            featured = "Có"
        }
        return {
            ...product.dataValues,
            price: formatPrice,
            sale_price: formatSale_price,
            featured: featured,
        }
    })
    res.render('admin/product/list_product',
        {
            layout: 'admin',
            products: processedProducts,
            username: req.session.user.username,
        }
    )
}

module.exports = {
    show_list_product,
    add_product,
    post_product,
    edit_product,
    update_product,
    delete_product
};
