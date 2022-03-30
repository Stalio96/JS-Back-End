const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const schema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'], validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email may contain only english letters and must be valid email'
        }
    },
    hashedPassword: { type: String, required: true },
    descSkills: { type: String, required: true, maxlength: [40, 'The description of skills should be a maximum of 40 characters long'] },
    myAds: { type: [ObjectId], ref: 'Ad', default: [] }
});

schema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = model('User', schema);