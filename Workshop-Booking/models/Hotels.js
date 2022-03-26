const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, minlength: 4 },
    city: { type: String, required: true, minlength: 3 },
    imageUrl: { type: String, required: true, match: [/^https?/, 'Image must be a valid URL'] },
    rooms: { type: Number, required: true, min: 1, max: 100 },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Hotel', schema);