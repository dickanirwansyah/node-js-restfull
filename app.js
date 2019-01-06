const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

//morgan log
app.use(morgan('dev'));

//router handling
app.use('/products', productRoutes);
app.use('/order', orderRoutes);


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

module.exports = app;