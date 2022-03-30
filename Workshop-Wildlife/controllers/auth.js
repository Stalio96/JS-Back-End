const { isGuest, isUser } = require('../middleware/guards');
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register page' });
});

//TODO check form action, method, field names
router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Password is required')
        } else if (req.body.password != req.body.repass) {
            throw new Error('Passwords dont match')
        }
        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;

        res.redirect('/'); //TODO check redirect
    } catch (err) {
        //TODO send error messages
        const errors = mapErrors(err);
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        console.log(errors);
        res.render('register', { title: 'Register page', data, errors });
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);

        req.session.user = user;

        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('login', { title: 'Login page', data: { email: req.body.email }, errors });
    }
});

router.get('/logout', isUser(), async (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;