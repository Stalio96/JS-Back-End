const { Schema, model } = require('mongoose');

//TODO add validation
const NAME_PATTERN = /[A-Z][a-z]+ [A-Z][a-z]+/;
const schema = new Schema({
    name: { type: String, required: true, validate: {
        validator(value){
            return NAME_PATTERN.test(value);
        }
    } },
    username: { type: String, minlength: [5, 'Username must be at least 5 characters long'] },
    hashedPassword: { type: String, required: true }
});

schema.index({ username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = model('User', schema);