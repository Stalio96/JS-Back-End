const authContoller = require('../controllers/authContoller');
const homeController = require('../controllers/homeContorller');
const hotelController = require('../controllers/hotelController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authContoller);
    app.use('/hotels', hotelController);
}