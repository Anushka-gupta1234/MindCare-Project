const Task = require('../models/Task'); // Import the Task model
const asyncWrapper = require('../middleware/async');
const bcrypt = require('bcryptjs');

const handleAuth = asyncWrapper(async (req, res) => {
    const { name, username, password } = req.body;
    // console.log('Received data:', req.body);

    if (!username || !password) {
        return res.status(400).json({ msg: 'Username and password are required' });
    }

    if (name) {
        // **Signup logic**
        const existingUser = await Task.findOne({ username });
        // console.log('Existing user:', existingUser);
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        const newUser = new Task({ name, username, password });
        // console.log('Creating new user:', newUser);

        try {
            await newUser.save();
            console.log('User created successfully');
            return res.status(201).json({ msg: 'Signup successful', user: newUser.username });
        } catch (error) {
            console.error('Error during user creation:', error.message);
            return res.status(500).json({ msg: error.message });
        }
    } else {
        // **Login logic**
        const user = await Task.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        return res.status(200).json({ msg: 'Login successful' });
    }
});


module.exports = {
    handleAuth
};
