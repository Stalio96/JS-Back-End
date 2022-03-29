const { isUser } = require('../middleware/guards');
const { createCourse, getAllCourses, getCourseById } = require('../services/courses');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await getAllCourses();
    console.log(courses)
    res.render('home', { title: 'Home page', courses });
});

router.get('/create', isUser(), (req, res) => {
    res.render('create');
});

router.post('/create', isUser(), async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration
    }

    try {
        await createCourse(course, req.session.user._id);
        res.redirect('/');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', { course, errors });
    }
});

router.get('/details/:id', async (req, res) => {
    const course = await getCourseById(req.params.id);
    console.log(course)
    //course.isOwner = req.session && req.session.user._id == 
    res.render('details', course)
});

module.exports = router;