const { isUser } = require('../middleware/guards');
const { createAd, getAllAds, getAdById, editAd, deleteAd, searchAd, apply } = require('../services/ad');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let ads = await getAllAds();
    ads = ads.slice(0, 3);
    res.render('home', { title: 'Home page', ads });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create page' });
});

router.post('/create', isUser(), async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        author: req.session.user._id
    }

    try {
        await createAd(ad, req.session.user._id);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', { title: 'Create page', ad, errors });
    }
});

router.get('/catalog', async (req, res) => {
    const ads = await getAllAds();
    res.render('catalog', { title: 'Catalog page', ads });
});

router.get('/details/:id', async (req, res) => {
    const ad = await getAdById(req.params.id);
    if (req.session.user) {
        ad.hasUser = true;
        ad.isOwner = req.session.user._id == ad.author._id;


        if(ad.usersApplied.some(b => b._id == req.session.user._id)){
            ad.isJoined = true;
        }
        
        //if(ad.remaining.length == 0){
        //    ad.isFull = true;
        //}
    }
    res.render('details', { title: 'Details page', ad })
});

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const ad = await getAdById(id);
    
    res.render('edit', { title: 'Edit page', ad });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription
    }

    try{
        await editAd(id, ad);
        res.redirect('/details/' + id);
    }catch(err){
        const errors = mapErrors(err);
        res.render('edit', { title: 'Edit page', ad, errors });
    }
});

router.get('/delete/:id', isUser(), async (req, res) => {
    await deleteAd(req.params.id);
    res.redirect('/catalog');
});

router.get('/search', isUser(), (req, res) => {
    res.render('search', {title: 'Search page'});
});

router.post('/search', async (req, res) => {
    const matches = await searchAd(req.body.search);
    console.log(req.body.search);
    console.log(matches);


    res.render('search', { title: 'Search page', matches });
});

router.get('/apply/:id', isUser(), async (req, res) => {
    await apply(req.session.user._id, req.params.id);
    res.redirect('/details/' + req.params.id);
})

module.exports = router;