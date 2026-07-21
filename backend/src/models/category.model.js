const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục không được để trống"],
      trim: true,
      unique: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Category", categorySchema);