const { isUser } = require('../middleware/guards');
const { createArt, getAllArt, getArtById, editArt, deleteArt, getProfile, sharePublication } = require('../services/publication');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const arts = await getAllArt();
        res.render('home', { title: 'Home page', arts });
    } catch (err) {
        const errors = mapErrors(err);
        res.render('/', { title: 'Home page', errors });
    }
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create page' });
});

router.post('/create', isUser(), async (req, res) => {
    const art = {
        title: req.body.title,
        technique: req.body.technique,
        artPic: req.body.artPic,
        authenticy: req.body.authenticy,
        author: req.session.user._id
    };

    try {
        await createArt(art, req.session.user._id);
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', { title: 'Create page', errors });
    }
});

router.get('/gallery', async (req, res) => {

    const arts = await getAllArt();
    res.render('gallery', { title: 'Gallery page', arts });
});

router.get('/details/:id', async (req, res) => {
    const art = await getArtById(req.params.id);
    
    if (art.author == req.session.user?._id) {
        res.locals.isOwner = true;
    }
    art.hasUser = Boolean(req.user)
    art.shared = req.session.user && art.userShared.find(u => u == req.session.user._id);
    console.log(art.userShared);
    console.log(art.shared)

    res.render('details', { title: 'Details page', art });
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const art = await getArtById(req.params.id);
    if (art.author != req.session.user?._id) {
        res.redirect('/');
    }
    res.render('edit', { title: 'Edit page', art });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const art = {
        title: req.body.title,
        technique: req.body.technique,
        artPic: req.body.artPic,
        authenticy: req.body.authenticy
    }
    try {
        await editArt(req.params.id, art);
        res.redirect('/details/' + req.params.id);
    } catch (err) {
        const errors = mapErrors(err);
        res.render('edit', { title: 'Edit page', art, errors });
    }
});

router.get('/delete/:id', isUser(), async(req, res) => {
    await deleteArt(req.params.id);
    res.redirect('/gallery');
});

router.get('/profile', isUser(), async (req, res) => {
    const profile = await getProfile(req.session.user._id);
    console.log(profile);
    res.render('profile', {title: 'Profile page', profile});
});

router.get('/share/:id', isUser(), async (req, res) => {
    await sharePublication(req.session.user._id, req.params.id);

    res.redirect('/details/' + req.params.id);
});


module.exports = router;