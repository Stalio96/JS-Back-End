const playServise = require('../services/play');

module.exports = () => (req, res, next) => {
    req.storage = {
        ...playServise
    };

    next();
}