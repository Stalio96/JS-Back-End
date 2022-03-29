const { Schema, model, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 50 },
    imageUrl: { type: String, required: true },
    duration: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userEnrolled: { type: [ObjectId], ref: 'User', default: [] }
});


module.exports = model('Courses', schema);