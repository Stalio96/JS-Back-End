const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getAllTrips, getTripById, getTripAndUsers, getTripsByUser } = require('../services/trip');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' })
});

router.get('/trips', async (req, res) => {
    const trips = await getAllTrips();

    res.render('catalog', { title: 'Shared trips', trips });
});

router.get('/details/:id', preload(true), async (req, res) => {
    const trip = res.locals.trip;
    trip.remaining = trip.seats - trip.buddies.length;
    trip.buddiesList = trip.buddies.map(b => b.email).join(', ');
    if(req.session.user){
        trip.hasUser = true;
        trip.isOwner = req.session.user._id == trip.owner._id;

        if(trip.buddies.some(b => b._id == req.session.user._id)){
            trip.isJoined = true;
        }

        if(trip.remaining.length == 0){
            trip.isFull = true;
        }
    }

    res.render('details', { title: 'Details page' });
});

router.get('/profile', isUser(), async (req, res) => {
    const tripsByUser = await getTripsByUser(req.session.user._id);
    res.locals.user.tripCount = tripsByUser.length;
    res.locals.user.trips = tripsByUser;
    res.render('profile', {title: 'Profile page'})
})

module.exports = router;