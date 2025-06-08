
const express = require('express');
const router = express.Router();
const path = require('path');
const gardenController = require('../controllers/garden');


// Import controllers
const { handleAuth } = require('../controllers/main');           // login/signup
const { createBlog, getAllBlogs, getSingleBlog } = require('../controllers/blog'); // blogs
const { handleContact } = require('../controllers/contact');     // feedback


// Import auth middleware
const authMiddleware = require('../middleware/auth');

// ===== PUBLIC LOGIN ROUTE =====
router.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/login/login.html'));
    })
    .post(handleAuth);

// ===== PROTECTED ROUTES BELOW THIS =====
router.use(authMiddleware);

// ===== BLOG ROUTES =====
router.post("/writeblog/add", createBlog);
router.get("/writeblog/all", getAllBlogs);
router.get("/writeblog/:id", getSingleBlog);

// ===== FEEDBACK ROUTES =====
router.get("/feedback", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/contact/feedback.html"));
});
router.post("/feedback", handleContact);

// ===== GARDEN (Task Progress) ROUTES =====
router.get("/:username/progress", authMiddleware, gardenController.getUserProgress);
router.post("/:username/progress", authMiddleware, gardenController.updateUserProgress);

// SAFE HAVEN 
router.get("/validate-token", (req, res) => {
    res.status(200).json({ msg: "Token is valid" });
});

module.exports = router;


