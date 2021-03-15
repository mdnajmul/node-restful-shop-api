//import express package
const express = require('express');

//create roter object
const router = express.Router();

//create GET method/route to fetch/retreive data
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

//create POST method/route to create/save data
router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: 'Orders were saved/created',
        order: order
    });
});


//create GET method/route for fetch/retreive specific data
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details.',
        orderId: req.params.orderId
    });
});


//create DELETE method/route for delete specific data
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Deleted.',
        orderId: req.params.orderId
    });
});


//exports router object
module.exports = router;