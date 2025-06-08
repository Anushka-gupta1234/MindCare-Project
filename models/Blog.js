const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    email: { type: String, required: true }, // Storing author's email
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
