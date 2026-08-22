const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        const mongoURI =
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/pc_store_db";

        await mongoose.connect(mongoURI);

        console.log("MongoDB kết nối thành công");
        console.log(`Database: ${mongoose.connection.name}`);

    } catch (error) {

        console.error(
            "MongoDB kết nối thất bại:",
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDB;