const authController = require('../controllers/auth');
const tripContorller = require('../controllers/trip');
const homeContorller = require('../controllers/home');

module.exports = (app) => {
    app.use(authController);
    app.use(tripContorller);
    app.use(homeContorller);

    app.use('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' })
    })
}