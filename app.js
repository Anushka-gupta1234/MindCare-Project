// require('dotenv').config();
// require('express-async-errors');

// const express = require('express');
// const app = express();
// const connectDB = require('./db/connect');
// const path = require('path');

// const mainRouter = require('./routes/main');
// const blogRoutes = require('./routes/blog');
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// // Explicitly serve homepage.html when user visits "/"
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "homepage.html"));
// });

// // Serve emergency.html
// app.get("/emergency.html", (req, res) => { 
//     res.sendFile(path.join(__dirname, "public", "emergency.html"));
// });

// // Serve static files but disable default index.html behavior
// app.use("/MindCare", express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data


// // Routes
// app.use('/MindCare', mainRouter);
// app.use('/MindCare/writeblog', blogRoutes);

// app.get('/MindCare/blog/readblog.html', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'blog', 'readblog.html'));
// });

// // If /MindCare/blog/readblog is accessed without .html, redirect to the correct file
// app.get('/MindCare/blog/readblog', (req, res) => {
//     res.redirect('/MindCare/blog/readblog.html');
// });


// // Error handling middleware
// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

// const port = process.env.PORT || 3000;

// const start = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error('MONGO_URI is not defined in .env file');
//         }

//         await connectDB(process.env.MONGO_URI);
//         console.log('✅ Connected to MongoDB successfully');

//         app.listen(port, () =>
//             console.log(`🚀 Server is running on http://localhost:${port}`)
//         );
//     } catch (error) {
//         console.error('❌ Failed to start server:', error.message);
//         process.exit(1);
//     }
// };

// start();


require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const path = require('path');

const mainRouter = require('./routes/main');
const blogRoutes = require('./routes/blog');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Serve static files under /MindCare
app.use("/MindCare", express.static(path.join(__dirname, 'public')));

// Serve specific HTML files
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "homepage.html")));
app.get("/emergency.html", (req, res) => res.sendFile(path.join(__dirname, "public", "emergency.html")));
app.get('/MindCare/blog/readblog.html', (req, res) => res.sendFile(path.join(__dirname, 'public', 'blog', 'readblog.html')));
app.get('/MindCare/blog/readblog', (req, res) => res.redirect('/MindCare/blog/readblog.html')); // Fix for missing .html

// Routes
app.use('/MindCare', mainRouter);
app.use('/MindCare/writeblog', blogRoutes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server setup
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
