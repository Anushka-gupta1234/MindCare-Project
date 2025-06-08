
const mongoose = require("mongoose"); 
const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
    try {
        const { title, content, author, email } = req.body;

        // Check if all fields are present
        if (!title || !content || !author || !email) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Create and save the blog
        const newBlog = new Blog({ title, content, author, email });
        await newBlog.save();

        console.log("✅ Blog saved to database:", newBlog);

        res.status(201).json({ message: "Blog successfully created!", blog: newBlog });
    } catch (error) {
        console.error("❌ Error saving blog:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort latest blogs first
        res.status(200).json(blogs);
    } catch (error) {
        console.error("❌ Error fetching blogs:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID" });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error("❌ Error fetching single blog:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createBlog, getAllBlogs, getSingleBlog };
