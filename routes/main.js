const express = require('express');
const router = express.Router();
const path = require('path');
const { handleAuth } = require('../controllers/main');

router.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    })
    .post(handleAuth); // Unified function to handle both signup & login

module.exports = router;
