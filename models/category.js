const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  submenu: [
    {
      title: String,
      slug: {
        type: String,
        unique: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Category", Schema);
