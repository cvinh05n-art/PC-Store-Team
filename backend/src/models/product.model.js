const db = require("../config/database");

const Product = {
    async getAll() {
        const [rows] = await db.query(`
            SELECT 
                p.*,
                c.name AS category_name,
                b.name AS brand_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN brands b ON p.brand_id = b.id
            ORDER BY p.id DESC
        `);

        return rows;
    },

    async getById(id) {
        const [rows] = await db.query(`
            SELECT 
                p.*,
                c.name AS category_name,
                b.name AS brand_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN brands b ON p.brand_id = b.id
            WHERE p.id = ?
        `, [id]);

        return rows[0];
    },

    async create(product) {
        const {
            name,
            description,
            price,
            quantity,
            image,
            category_id,
            brand_id
        } = product;

        const [result] = await db.query(`
            INSERT INTO products
            (name, description, price, quantity, image, category_id, brand_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            name,
            description,
            price,
            quantity,
            image,
            category_id,
            brand_id
        ]);

        return result.insertId;
    },

    async update(id, product) {
        const {
            name,
            description,
            price,
            quantity,
            image,
            category_id,
            brand_id
        } = product;

        const [result] = await db.query(`
            UPDATE products
            SET
                name = ?,
                description = ?,
                price = ?,
                quantity = ?,
                image = ?,
                category_id = ?,
                brand_id = ?
            WHERE id = ?
        `, [
            name,
            description,
            price,
            quantity,
            image,
            category_id,
            brand_id,
            id
        ]);

        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        return result.affectedRows;
    }
};

module.exports = Product;