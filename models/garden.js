// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  completedTasks: { type: [String], default: [] },
  selectedFlower: { type: String, default: "🌹" },
});

module.exports = mongoose.model('Garden', userSchema);
