const express = require('express');

const expressConfing = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    expressConfing(app);
    await databaseConfig(app);
    routesConfig(app);

    
    app.listen(3000, console.log('Server running on port 3000'));

}