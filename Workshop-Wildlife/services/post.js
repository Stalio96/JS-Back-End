const Post = require('../models/Post');

async function createPost(post) {
    const result = new Post(post);

    await result.save();

    return result;
}

async function getPosts() {
    const posts = await Post.find({});

    return posts;
}

async function getPostById(id) {
    const post = await Post.findById(id).populate('author', 'firstName lastName').populate('votes', 'email');

    return post;
}

async function editPost(id, postData) {
    const existing = await getPostById(id);


    existing.title = postData.title;
    existing.keyword = postData.keyword;
    existing.location = postData.location;
    existing.date = postData.date;
    existing.image = postData.image;
    existing.description = postData.description;

    await existing.save();
}

async function deletePost(id) {
    return Post.findByIdAndDelete(id);
}

async function vote(postId, userId, value) {
    const post = await getPostById(postId);

    if (post.votes.includes(userId)) {
        throw new Error('User has already voted');
    }

    post.votes.push(userId);
    post.rating += value;
    await post.save();
}

async function getMyPosts(userId) {
    return Post.find({ author: userId }).populate('author', 'firstName lastName');
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    editPost,
    deletePost,
    vote,
    getMyPosts
}