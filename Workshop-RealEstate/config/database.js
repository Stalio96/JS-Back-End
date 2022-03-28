const mongoose = require('mongoose');
require('../models/User');
require('../models/Housing');

const dbName = 'realestate';
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try{
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Database connetcted');
    
        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        });
    }catch(err){
        console.error('Error connecting to database');
        process.exit(1);
    }
}