const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO add all fields required by the exam
async function register(email, password, descSkills) {
    const existing = await getUserbyEmail(email);

    if (existing) {
        throw new Error('Email is taken')
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({ email, hashedPassword, descSkills });

    await user.save();

    return user;
}

//TODO change indentifier
async function login(email, password){
    const user = await getUserbyEmail(email);

    if(!user){
        throw new Error('Username or password dont match');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if(!hasMatch){
        throw new Error('Email or password dont match');
    }

    return user;
}

//TODO indentify user by given indentifier
async function getUserbyEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}

module.exports = {
    login,
    register
}