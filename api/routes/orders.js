//import express package
const express = require('express');

//create roter object
const router = express.Router();

//import check-auth middleware
const checkAuth = require('../middleware/check-auth');

//import orders controoler
const OrdersController = require('../controllers/orders');

//create GET method/route to fetch/retreive data
router.get('/', checkAuth, OrdersController.orders_get_all);

//create POST method/route to create/save data
router.post('/', checkAuth, OrdersController.orders_create);


//create GET method/route for fetch/retreive specific data
router.get('/:orderId', checkAuth, OrdersController.orders_get_specific);


//create DELETE method/route for delete specific data
router.delete('/:orderId', checkAuth, OrdersController.orders_delete);


//exports router object
module.exports = router;