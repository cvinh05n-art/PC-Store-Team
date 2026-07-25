const db = require("../config/database");

const User = {
    async findByEmail(email) {
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows[0];
    },

    async create(fullName, email, password) {
        const [result] = await db.execute(
            `INSERT INTO users (full_name, email, password)
             VALUES (?, ?, ?)`,
            [fullName, email, password]
        );

        return result.insertId;
    }
};

module.exports = User;