// import .env - environmental variable
require('dotenv').config();

// define port and mongodb url to export
const port = process.env.PORT;
const mongoDb = process.env.MONGODB_URI;

module.exports = {
    port,mongoDb
}