require("dotenv").config();

<<<<<<< HEAD
=======
const mongoose = require("mongoose");
>>>>>>> main
const app = require("./app");
const db = require("./config/database");

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
async function startServer() {
    try {
        const connection = await db.getConnection();

        console.log("MySQL connected successfully");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:");
        console.error(error.message);
    }
}

startServer();
=======
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/product_management";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");

    app.listen(PORT, () => {
      console.log(
        `Server đang chạy tại http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Kết nối MongoDB thất bại:",
      error.message
    );

    process.exit(1);
  });
>>>>>>> main
