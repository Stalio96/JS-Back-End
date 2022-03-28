const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;


const schema = new Schema({
    email: { type: String, required: true, validate: {
        validator(value){
            return EMAIL_PATTERN.test(value);
        },
        message: 'The email must be valid email'
    } },
    hashedPassword: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    tripHistory: { type: [ObjectId], ref: 'Trip', default: [] }
});

schema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = model('User', schema);