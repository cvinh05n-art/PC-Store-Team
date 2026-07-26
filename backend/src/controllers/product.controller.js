const productService = require("../services/product.service");

const productController = {
    // GET /api/products
    async getAll(req, res) {
        try {
            const products = await productService.getAllProducts();

            res.status(200).json({
                message: "Lấy danh sách sản phẩm thành công",
                data: products
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    },

    // GET /api/products/:id
    async getById(req, res) {
        try {
            const { id } = req.params;

            const product = await productService.getProductById(id);

            res.status(200).json({
                message: "Lấy thông tin sản phẩm thành công",
                data: product
            });
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    },

    // POST /api/products
    async create(req, res) {
        try {
            const productId = await productService.createProduct(req.body);

            res.status(201).json({
                message: "Tạo sản phẩm thành công",
                productId
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    // PUT /api/products/:id
    async update(req, res) {
        try {
            const { id } = req.params;

            await productService.updateProduct(id, req.body);

            res.status(200).json({
                message: "Cập nhật sản phẩm thành công"
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    // DELETE /api/products/:id
    async delete(req, res) {
        try {
            const { id } = req.params;

            await productService.deleteProduct(id);

            res.status(200).json({
                message: "Xóa sản phẩm thành công"
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

module.exports = productController;