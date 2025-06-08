const asyncWrapper = require('../middleware/async');

// Example logic: save or handle contact form submission
const handleContact = asyncWrapper(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please fill in all fields' });
    }

    console.log("📩 Feedback received:", { name, email, message });

    res.status(200).json({ msg: "Thank you for your feedback!" });
});

// ✅ Make sure to export it!
module.exports = {
    handleContact
};
