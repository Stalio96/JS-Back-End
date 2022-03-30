const { Schema, model } = require('mongoose');

//TODO change user model
//TODO add validation
const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const schema = new Schema({
    firstName: {
        type: String, minlength: [3, 'FirstName must be atleast 3 characters long'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'First name may contain only english letter'
        }
    },
    lastName: {
        type: String, minlength: [5, 'Last name must be atleast 5 characters long'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            message: 'Last name may contain only english letter'
        }
    },
    email: { type: String, required: [true, 'Email is required'], validate:{
        validator(value){
            return EMAIL_PATTERN.test(value);
        },
        message: 'Email may contain only english letter'
    } },
    hashedPassword: { type: String, required: true }
});

schema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = model('User', schema);