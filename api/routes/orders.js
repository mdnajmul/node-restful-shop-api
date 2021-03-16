//import express package
const express = require('express');

//create roter object
const router = express.Router();

//import mongoose package
const mongoose = require('mongoose');

//import Order model
const Order = require('../models/order');
//import Product model
const Product = require('../models/product');

//import check-auth middleware
const checkAuth = require('../middleware/check-auth');

//create GET method/route to fetch/retreive data
router.get('/', checkAuth, (req, res, next) => {
    Order.find()
         .select('product quantity _id')
         .populate('product', 'name')
         .exec()
         .then(docs => {
             res.status(200).json({
                 count: docs.length,
                 orders: docs.map(doc => {
                     return {
                         _id: doc._id,
                         product: doc.product,
                         quantity: doc.quantity,
                         request: {
                             type: 'GET',
                             url: 'http://localhost:3000/orders/' + doc._id
                         }
                     }
                 })
             });
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             });
         });
});

//create POST method/route to create/save data
router.post('/', checkAuth, (req, res, next) => {

    Product.findById(req.body.productId)
           .then(product => {
                if (!product) {
                    return res.status(404).json({
                        message: 'Product not found'
                    });
                }
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.productId
                });
                return order.save();
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Order Stored',
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Product not found',
                    error: err
                });
            });
    });


//create GET method/route for fetch/retreive specific data
router.get('/:orderId', checkAuth, (req, res, next) => {
    Order.findById(req.params.orderId)
         .select('quantity product _id')
         .populate('product')
         .exec()
         .then(order => {
             if (!order) {
                 return res.status(404).json({
                     message: 'Order not found'
                 });
             }
             res.status(200).json({
                 order: order,
                 request: {
                     type: 'GET',
                     url: 'http://localhost:3000/orders'
                 }
             });
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             });
         });
});


//create DELETE method/route for delete specific data
router.delete('/:orderId', checkAuth, (req, res, next) => {
    Order.remove({ _id: req.params.orderId})
         .exec()
         .then(result => {
             res.status(200).json({
                 message: 'Order Deleted Successfully.',
                 request: {
                     type: 'POST',
                     url: 'http://localhost:3000/orders',
                     body: { productId: 'ID', quantity: 'Number'}
                 }
             });
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             });
         });
});


//exports router object
module.exports = router;