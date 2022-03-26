const { Schema, model, Types: { ObjectId } } = require('mongoose');


const schema = new Schema({
    title: { type: String, required: true },
    technique: { type: String, required: true },
    artPic: { type: String, required: true },
    authenticy: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
    userShared: { type: [ObjectId], ref: 'User' }
});

module.exports = model('Publication', schema);