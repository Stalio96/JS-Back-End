const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('booking/create');
});

router.post('/create', isUser(), async (req, res) => {
    const hotelData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner: req.user._id
    };

    try {
        await req.storage.createHotel(hotelData);

        res.redirect('/');
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message)
        } else {
            errors = [err.message];
        }

        const ctx = {
            errors,
            hotelData: {
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms
            }
        }

        res.render('booking/create', ctx);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const hotel = await req.storage.getHotelById(req.params.id);

        res.render('booking/edit', { hotel })
    } catch (err) {

    }
});

router.post('/edit/:id', async (req, res) => {
    try{
        const hotel = await req.storage.getHotelById(req.params.id);

        if(req.user._id != hotel.owner){
            throw new Error('You must be the owner of this hotel');
        }

        await req.storage.editHotel(req.params.id, req.body);

        res.redirect('/');
    }catch(err){
        const ctx = {
            errors: err.message,
            hotel: {
                _id: req.params.id,
                name: req.body.name,
                city: req.body.city,
                imageUrl: req.body.imageUrl,
                rooms: req.body.rooms
            }
        }

        res.render('booking/edit', ctx);
    }
})

router.get('/details/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const hotel = await req.storage.getHotelById(req.params.id);

        hotel.hasUser = Boolean(req.user);
        hotel.isAuthor = req.user && req.user._id == hotel.owner;
        hotel.isBooked = req.user && hotel.bookedBy.find(x => x == req.user._id);


        res.render('booking/details', { hotel });
    } catch (err) {

    }
});

router.get('/book/:id', isUser(), async (req, res) => {
    try{

        await req.storage.bookHotel(req.params.id, req.user._id);

        res.redirect('/hotels/details/' + req.params.id);
    }catch(err){
        res.redirect('/')
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    try{
        const hotel = await req.storage.getHotelById(req.params.id);

        if(req.user._id != hotel.owner){
            throw new Error('Cannot delete hotel you are not owner!');
        }

        console.log(req.params.id)
        await req.storage.deleteHotel(req.params.id);
        res.redirect('/');
    }catch(err){
        res.redirect('/');
    }
})

module.exports = router;