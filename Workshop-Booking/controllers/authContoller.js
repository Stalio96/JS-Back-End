const { isGuest } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
})

router.post('/register', isGuest(), async (req, res) => {
    console.log(req.body);
    if(req.body.username.length < 3 || (req.body.password.length != req.body.rePass.length)){
        throw new Error('Validation error');
    }

    await req.auth.register(req.body.username, req.body.email, req.body.password);

    res.redirect('/')
})

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
})

router.post('/login', isGuest(), async (req, res) => {
    try{
        await req.auth.login(req.body.username, req.body.password);

        res.redirect('/');
    }catch(err){
        console.log(err);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }

        res.render('user/login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;