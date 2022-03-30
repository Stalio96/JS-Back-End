const { Schema, model, Types: { ObjectId } } = require('mongoose');


const schema = new Schema({
    headline: { type: String, minlength: [4, 'Headline should be a minimum of 4 characters long'] },
    location: { type: String, minlength: [8, 'Location should be a minimum of 8 characters long'] },
    companyName: { type: String, minlength: [3, 'Company name should be at least 3 characters'] },
    companyDescription: { type: String, required: true, maxlength: [40, 'Company description should be a maximum of 40 characters long'] },
    author: { type: ObjectId, ref: 'User' },
    usersApplied: { type: [ObjectId], ref: 'User', default: [] }
});


module.exports = model('Ad', schema);