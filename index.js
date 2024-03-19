// import server,config,and logger js
const app = require('./server.js');
const config = require('./utils/config.js');
const {info,error} = require('./utils/logger.js');

// import mongoose for mongodb
const mongoose = require('mongoose');

// set strict query false
mongoose.set('strictQuery',false);

// connect mongodb using mongoose
info('connecting to db ...',config.mongoDb);

mongoose.connect(config.mongoDb).then(
    () => {
        
        info( "Mongodb connected successfully" );

        // listener
app.listen(config.port,() => {
    info( `Server is running at port : ${config.port}` );
});

    }
).catch( (error) => {
    error("Error while connecting to Mongodb ...",error);
});

