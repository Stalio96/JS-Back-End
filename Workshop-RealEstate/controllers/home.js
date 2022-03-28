const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createHouse, getAllHouses, getHouseById, getLast3Houser, editHouse, deleteHouse, searchHouses, rentHome } = require('../services/housing');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let lastHouses = await getLast3Houser();
    lastHouses = lastHouses.slice(-3);
    console.log(lastHouses)

    res.render('home', { title: 'Home page', lastHouses });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create page' })
});

router.post('/create', isUser(), async (req, res) => {
    const house = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        homeImg: req.body.homeImg,
        description: req.body.description,
        availablePieces: req.body.availablePieces,
        owner: req.session.user._id
    }

    try {
        await createHouse(house);
        res.redirect('/rent')
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', { data: house, errors });
    }
});

router.get('/rent', async (req, res) => {
    const houses = await getAllHouses();
    res.render('rent', { title: 'Rent page', data: houses });
});

router.get('/details/:id', async (req, res) => {
    const house = await getHouseById(req.params.id);
    if (req.session.user?._id == house.owner) {
        res.locals.isOwner = true;
    }else{
        if(req.session.user){
            if (house.rentedHome.includes(req.session.user._id)) {
                res.locals.hasRent = true;
            }else{
                res.locals.pieces = house.availablePieces - house.rentedHome.length;
                if(res.locals.pieces == 0){
                    res.locals.empty = true;
                }
            }
        }
    }
    res.render('details', { title: 'Details page', house });

});

router.get('/edit/:id', isUser(), async (req, res) => {
    const house = await getHouseById(req.params.id);
    if (req.session.user._id != house.owner) {
        res.redirect('/');
    }
    res.render('edit', { title: 'Edit page', house });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const house = {
        name: req.body.name,
        type: req.body.type,
        year: Number(req.body.year),
        city: req.body.city,
        homeImg: req.body.homeImg,
        description: req.body.description,
        availablePieces: Number(req.body.availablePieces),
        owner: req.session.user._id
    }
    try {
        await editHouse(req.params.id, house);
        res.redirect('/details/' + req.params.id);
    } catch (err) {
        const errors = mapErrors(err);
        house._id = req.params.id;
        res.render('edit', { title: 'Edit page', house, errors });
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    await deleteHouse(req.params.id);

    res.redirect('/rent');
});

router.get('/search', (req, res) => {
    res.render('search', { title: 'Search page' });
});

router.post('/search', async (req, res) => {
    const matches = await searchHouses(req.body.search);
    console.log(req.body.search);
    console.log(matches);

    res.render('search', { title: 'Search page', matches });
});

router.get('/rentHome/:id', isUser(), async (req, res) => {
    const house = await getHouseById(req.params.id);
    console.log(house)
    await rentHome(req.params.id, req.session.user._id);
    res.locals.pieces = house.availablePieces - house.rentedHome.length;
    res.render('details', { title: 'Details page', house, pieces: res.locals.pieces })
})

module.exports = router;