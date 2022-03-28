const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /(^https?:\/\/)(.+)/;

const shcema = new Schema({
    name: { type: String, required: true, minlength: [6, 'Name must be at least 6 characters long'] },
    type: { type: String, required: true, },
    year: { type: Number, required: true, min: [1850, 'Year must be between 1850 and 2021'], max: [2021, 'Year must be between 1850 and 2021'] },
    city: { type: String, required: true, minlength: [4, 'City should be at least 4 characters long'] },
    homeImg: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'House image must be valid URL'
        }
    },
    description: { type: String, maxlength: [60, 'Description must be maximum 60 characters long'] },
    availablePieces: { type: Number, required: true, min: 0, max: 10 },
    rentedHome: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User' }
});


module.exports = model('Housing', shcema);