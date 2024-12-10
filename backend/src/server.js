const http = require('http');
const app = require('./app');

require('dotenv').config();

const { mongoConnection } = require('./config/db');
const { loadCustomerData } = require('./models/messages.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnection(); // establishing mongo connection
    await loadCustomerData(); //loads the customer Data
    server.listen(PORT, () => {
        console.log(`listening to the ${PORT} PORT `);
    });
}

startServer();