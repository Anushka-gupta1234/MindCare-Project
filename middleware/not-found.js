const path = require('path');

const notFound = (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../errors/404Page.html'));
};

module.exports = notFound;
