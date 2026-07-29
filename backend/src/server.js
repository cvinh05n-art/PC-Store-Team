require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

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