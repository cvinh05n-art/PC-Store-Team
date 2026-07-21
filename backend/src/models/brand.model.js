const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên thương hiệu không được để trống"],
      trim: true,
      unique: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    country: {
      type: String,
      default: "",
      trim: true
    },

    logo: {
      type: String,
      default: ""
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

module.exports = mongoose.model("Brand", brandSchema);