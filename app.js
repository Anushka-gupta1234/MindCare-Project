require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const path = require('path');

// Routes
const routes = require('./routes/main');

// Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Core Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use("/MindCare", express.static(path.join(__dirname, 'public')));

// Serve Specific HTML Files
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "homepage.html")));
app.get("/emergency.html", (req, res) => res.sendFile(path.join(__dirname, "public", "emergency.html")));
app.get('/MindCare/blog/readblog.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'blog', 'readblog.html')));
app.get('/MindCare/blog/blogDetails.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'blog', 'blogDetails.html')));
app.get('/MindCare/blog/readblog', (req, res) => res.redirect('/MindCare/blog/readblog.html'));

// All App Routes
app.use('/MindCare', routes);

// Error Handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start Server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined in .env file');
        await connectDB(process.env.MONGO_URI);
        console.log(`✅ Connected to MongoDB | 🚀 Server running at http://localhost:${port}`);
        app.listen(port);
    } catch (error) {
        console.error(`❌ Server failed: ${error.message}`);
        process.exit(1);
    }
};

start();
