const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    title: String,
    description: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("todo", todoSchema);
