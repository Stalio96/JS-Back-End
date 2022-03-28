const { Schema, model, Types: { ObjectId } } = require('mongoose');

const IMAGE_PATTERN = /^https?:\/\/(.+)/;

const schema = new Schema({
    start: { type: String, minlength: [4, 'Start must be atleast 4 symbols'] },
    end: { type: String, minlength: [4, 'End must be atleast 4 symbols'] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carImg: {
        type: String, required: true, validate: {
            validator(value) {
                return IMAGE_PATTERN.test(value);
            },
            message: 'Car image must be valid URL'
        }
    },
    carBrand: { type: String, minlength: [4, 'Car Brand must be atleast 4 symbols'] },
    seats: { type: Number, required: true, min: 0, max: 4 },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: { type: String, minlength: [10, 'Description must be atleast 10 symbols'] },
    owner: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: 'User', default: [] }
})

module.exports = model('Trip', schema);