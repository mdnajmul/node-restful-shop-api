//import express package
const express = require('express');

//import morgan package
const morgan = require('morgan');

//import mongoose
const mongoose = require('mongoose');

//import body-parser
const bodyParser = require('body-parser');

//connect database
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@cluster0.mksub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

//create constant app
const app = express();

//use morgan
app.use(morgan('dev'));

//use body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//====Disable CORS (CORS Error Handling)====//

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE');
        return res.status(200).json({});
    }

    next();
});

//===========================================//

//import products route
const productRoutes = require('./api/routes/products');
//import orders route
const orderRoutes = require('./api/routes/orders');

//call prouct routes file
app.use('/products', productRoutes);
//call order route file
app.use('/orders', orderRoutes);


//=======Error Handling===================//

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//this is handle all kind of error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//========================================//

//exports this middleware function
module.exports = app;