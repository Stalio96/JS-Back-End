const { Schema, model, Types: { ObjectId } } = require('mongoose');

const IMAGE_PATTERN = /^https?:\/\/(.+)/;

const schema = new Schema({
    title: { type: String, minlength: [6, 'Title must be at least 6 characters long'] },
    keyword: { type: String, minlength: [6, 'Keyword must be at least 6 characters long'] },
    location: { type: String, maxlength: [15, 'Location must be max 15 characters long'] },
    date: { type: String, minlength: [10, 'Date must be at least 10 characters long'], maxlength: [10, 'Date must be max 15 characters long'] },
    image: {
        type: String, validate: {
            validator(value) {
                return IMAGE_PATTERN.test(value);
            },
            message: 'Image must be valid URL'
        }
    },
    description: { type: String, minlength: [8, 'Description must be at least 8 characters long'] },
    author: { type: ObjectId, ref: 'User', required: true },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 }
});

module.exports = model('Post', schema);