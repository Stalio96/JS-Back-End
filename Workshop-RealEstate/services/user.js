const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO add all fields required by the exam
async function register(name, username, password) {
    const existing = await getUserbyUsername(username);

    if (existing) {
        throw new Error('Username is taken')
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({ name, username, hashedPassword });

    await user.save();

    return user;
}

//TODO change indentifier
async function login(username, password) {
    const user = await getUserbyUsername(username);

    if (!user) {
        throw new Error('Username or password dnt match');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Username or password dnt match');
    }

    return user;
}

//TODO indentify user by given indentifier
async function getUserbyUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });
    return user;
}

module.exports = {
    login,
    register
}