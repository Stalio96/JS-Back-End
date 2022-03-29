const express = require('express');
const { PORT } = require('./config/index');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.get('/', (req, res) => res.send('it works'))

    app.listen(PORT, () => {
        console.log('it works')
    });
}