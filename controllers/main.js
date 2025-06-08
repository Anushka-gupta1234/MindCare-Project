
const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleAuth = asyncWrapper(async (req, res) => {
    const { name, username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    if (name) {
        // Signup logic
        const existingUser = await Task.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        const newUser = new Task({ name, username, password });
        await newUser.save();
        console.log('✅ User created successfully');
        return res.status(201).json({ msg: 'Signup successful', user: newUser.username });
    } else {
        // Login logic
        const user = await Task.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // JWT Token generation
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({ msg: 'Login successful', token, username : user.username });
    }
});

module.exports = { handleAuth };
