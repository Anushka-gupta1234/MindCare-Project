
const User = require('../models/garden');

exports.getUserProgress = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      completedTasks: user.completedTasks || [],
      selectedFlower: user.selectedFlower || "🌹"
    });
  } catch (err) {
    console.error("Error in getUserProgress:", err);
    res.status(500).json({ error: "Something went wrong, try again later" });
  }
};


exports.updateUserProgress = async (req, res) => {
  try {
    const { completedTasks, selectedFlower } = req.body;
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { completedTasks, selectedFlower },
      { new: true, upsert: true }
    );
    res.json({ message: 'Progress saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
