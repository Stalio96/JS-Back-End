const { Schema, model, Types: {ObjectId} } = require('mongoose');

//TODO add validation
const schema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    courses: {type: [ObjectId], ref: 'Courses', default: []}
});

schema.index({ username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = model('User', schema);