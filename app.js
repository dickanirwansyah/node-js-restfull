const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

//connect database mongodb with mongoose
var url = "mongodb://localhost:27017/rest-shop";

/** using mongo clien 
MongoClient.connect(url, function(err, db){
    if(err) throw err;
    console.log("Database created");
    db.close();
});
**/
mongoose.connect(url, {useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//router handling
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//router handling error
app.use((req, res, next) => {
    const error = new Error('Router Notfound..');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
          message: error.message
        }
    });
});

//cors handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({}); 
    }
    next()
});

module.exports = app;