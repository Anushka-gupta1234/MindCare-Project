const mongoose = require('mongoose');

const connectDB = (url) => {
    console.log('Attempting to connect to the database...'); // Debugging log
    return mongoose
        .connect(url)
        .then(() => console.log('Database connected successfully.')) // Success log
        .catch((error) => {
            console.error('Database connection failed:', error.message); // Error log
            throw error; // Rethrow the error to handle it in the main server file
        });
};

module.exports = connectDB;
