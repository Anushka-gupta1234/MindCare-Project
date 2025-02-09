// const mongoose = require("mongoose"); 
const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs, getSingleBlog } = require("../controllers/blog");
// const Blog = require("../models/Blog");  // ✅ Import the Blog model


// Log incoming requests
router.post("/add", (req, res, next) => {
    console.log("📩 Blog POST Request Received:", req.body);
    next();
});

// Routes
router.post("/add", createBlog);
router.get("/all", getAllBlogs);
router.get("/:id", getSingleBlog);

module.exports = router;



