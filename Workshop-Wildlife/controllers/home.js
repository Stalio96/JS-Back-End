const { isUser } = require('../middleware/guards');
const { getPosts, getPostById, getMyPosts } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home page' });
});

router.get('/catalog', async (req, res) => {
    const post = (await getPosts()).map(postViewModel);
    res.render('catalog', { title: 'Catalog page', post })
});

router.get('/catalog/:id', async (req, res) => {
    const post = postViewModel(await getPostById(req.params.id));

    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.isAuthor = true;
        } else {
            post.hasVoted = post.votes.find(v => v._id == req.session.user._id) != undefined;
        }
    }

    res.render('details', { title: post.title, post });
});

router.get('/profile', isUser(), async (req, res) => {
    const post = (await getMyPosts(req.session.user._id)).map(postViewModel);;
    res.render('my-posts', { title: 'My posts', post});
})

module.exports = router;