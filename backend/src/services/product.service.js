const mongoose = require("mongoose");

const Product = require("../models/product.model");
const Category = require("../models/category.model");
const Brand = require("../models/brand.model");

const productService = {

    // ==========================================
    // GET ALL PRODUCTS
    // ==========================================

    async getAllProducts() {

        return await Product.find()
            .populate("category", "name")
            .populate("brand", "name")
            .sort({ createdAt: -1 });

    },


    // ==========================================
    // GET PRODUCT BY ID
    // ==========================================

    async getProductById(id) {

        if (!mongoose.isValidObjectId(id)) {
            throw new Error("ID sản phẩm không hợp lệ");
        }

        const product = await Product.findById(id)
            .populate("category", "name")
            .populate("brand", "name");

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }

        return product;

    },


    // ==========================================
    // CREATE PRODUCT
    // ==========================================

    async createProduct(productData) {

        const {
            name,
            description,
            price,
            stock,
            quantity,
            image,
            category,
            brand,
            category_id,
            brand_id
        } = productData;


        // -------------------------------
        // Validate cơ bản
        // -------------------------------

        if (!name || !name.trim()) {
            throw new Error("Tên sản phẩm là bắt buộc");
        }

        if (price === undefined || price === null || price === "") {
            throw new Error("Giá sản phẩm là bắt buộc");
        }

        const productPrice = Number(price);

        if (Number.isNaN(productPrice) || productPrice < 0) {
            throw new Error("Giá sản phẩm không hợp lệ");
        }


        // -------------------------------
        // Tương thích quantity / stock
        // -------------------------------

        const productStock =
            stock !== undefined
                ? Number(stock)
                : Number(quantity || 0);

        if (Number.isNaN(productStock) || productStock < 0) {
            throw new Error("Số lượng sản phẩm không hợp lệ");
        }


        // -------------------------------
        // Tìm Category
        // -------------------------------

        let categoryId = category_id || category || null;

        if (categoryId && !mongoose.isValidObjectId(categoryId)) {

            const categoryDoc = await Category.findOne({
                name: categoryId
            });

            if (!categoryDoc) {
                throw new Error(
                    `Không tìm thấy danh mục "${categoryId}"`
                );
            }

            categoryId = categoryDoc._id;
        }


        // -------------------------------
        // Tìm Brand
        // -------------------------------

        let brandId = brand_id || brand || null;

        if (brandId && !mongoose.isValidObjectId(brandId)) {

            const brandDoc = await Brand.findOne({
                name: brandId
            });

            if (!brandDoc) {
                throw new Error(
                    `Không tìm thấy thương hiệu "${brandId}"`
                );
            }

            brandId = brandDoc._id;
        }


        // -------------------------------
        // Tạo sản phẩm
        // -------------------------------

        const product = await Product.create({

            name: name.trim(),

            description:
                description?.trim() || "",

            price: productPrice,

            stock: productStock,

            image:
                image || "",

            category:
                categoryId,

            brand:
                brandId,

            status: true

        });

        return product._id;

    },


    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    async updateProduct(id, productData) {

        if (!mongoose.isValidObjectId(id)) {
            throw new Error("ID sản phẩm không hợp lệ");
        }

        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }


        const updateData = {};


        // -------------------------------
        // Name
        // -------------------------------

        if (productData.name !== undefined) {

            if (!productData.name.trim()) {
                throw new Error("Tên sản phẩm không được để trống");
            }

            updateData.name = productData.name.trim();

        }


        // -------------------------------
        // Description
        // -------------------------------

        if (productData.description !== undefined) {

            updateData.description =
                productData.description?.trim() || "";

        }


        // -------------------------------
        // Price
        // -------------------------------

        if (productData.price !== undefined) {

            const price = Number(productData.price);

            if (Number.isNaN(price) || price < 0) {
                throw new Error("Giá sản phẩm không hợp lệ");
            }

            updateData.price = price;

        }


        // -------------------------------
        // Stock
        // -------------------------------

        const stockValue =
            productData.stock !== undefined
                ? productData.stock
                : productData.quantity;

        if (stockValue !== undefined) {

            const stock = Number(stockValue);

            if (Number.isNaN(stock) || stock < 0) {
                throw new Error(
                    "Số lượng sản phẩm không hợp lệ"
                );
            }

            updateData.stock = stock;

        }


        // -------------------------------
        // Image
        // -------------------------------

        if (productData.image !== undefined) {
            updateData.image = productData.image;
        }


        // -------------------------------
        // Category
        // -------------------------------

        const categoryValue =
            productData.category_id !== undefined
                ? productData.category_id
                : productData.category;

        if (categoryValue !== undefined) {

            let categoryId = categoryValue;

            if (
                categoryId &&
                !mongoose.isValidObjectId(categoryId)
            ) {

                const categoryDoc =
                    await Category.findOne({
                        name: categoryId
                    });

                if (!categoryDoc) {
                    throw new Error(
                        `Không tìm thấy danh mục "${categoryId}"`
                    );
                }

                categoryId = categoryDoc._id;

            }

            updateData.category = categoryId || null;

        }


        // -------------------------------
        // Brand
        // -------------------------------

        const brandValue =
            productData.brand_id !== undefined
                ? productData.brand_id
                : productData.brand;

        if (brandValue !== undefined) {

            let brandId = brandValue;

            if (
                brandId &&
                !mongoose.isValidObjectId(brandId)
            ) {

                const brandDoc =
                    await Brand.findOne({
                        name: brandId
                    });

                if (!brandDoc) {
                    throw new Error(
                        `Không tìm thấy thương hiệu "${brandId}"`
                    );
                }

                brandId = brandDoc._id;

            }

            updateData.brand = brandId || null;

        }


        // -------------------------------
        // Update
        // -------------------------------

        return await Product.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

    },


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    async deleteProduct(id) {

        if (!mongoose.isValidObjectId(id)) {
            throw new Error("ID sản phẩm không hợp lệ");
        }

        const product = await Product.findById(id);

        if (!product) {
            throw new Error("Không tìm thấy sản phẩm");
        }

        return await Product.findByIdAndDelete(id);

    }

};

module.exports = productService;