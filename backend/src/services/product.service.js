const Product = require("../models/product.model");

const productService = {
    async getAllProducts() {
        return await Product.getAll();
    },

    async getProductById(id) {
        const product = await Product.getById(id);

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }

        return product;
    },

    async createProduct(productData) {
        const {
            name,
            description,
            price,
            quantity,
            image,
            category_id,
            brand_id
        } = productData;

        if (!name || price === undefined) {
            throw new Error("Tên sản phẩm và giá là bắt buộc");
        }

        if (price < 0) {
            throw new Error("Giá sản phẩm không hợp lệ");
        }

        return await Product.create({
            name,
            description,
            price,
            quantity: quantity || 0,
            image,
            category_id,
            brand_id
        });
    },

    async updateProduct(id, productData) {
        const product = await Product.getById(id);

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }

        return await Product.update(id, productData);
    },

    async deleteProduct(id) {
        const product = await Product.getById(id);

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }

        return await Product.delete(id);
    }
};

module.exports = productService;