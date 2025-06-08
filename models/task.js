const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [25, 'name cannot be more than 25 characters']
    }, 
    username: {
        type: String,
        required: [true, 'must provide username'],
        trim: true,
        maxlength: [25, 'username cannot be more than 25 characters'],
        unique: true
    }, 
    password: {
        type: String,
        required: [true, 'must provide password'],
        trim: true,
        minlength: [2, 'password must be at least 2 characters long'],
        maxlength: [25, 'password cannot be more than 25 characters']
    }
});

// Hash the password before saving
TaskSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const collection = mongoose.model('Users', TaskSchema);
module.exports = collection;
