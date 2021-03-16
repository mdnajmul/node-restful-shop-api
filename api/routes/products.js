//import express package
const express = require('express');

//create roter object
const router = express.Router();

//import multer package for upload file
const multer = require('multer');

//import check-auth middleware
const checkAuth = require('../middleware/check-auth');

//import products controller file
const ProductsController = require('../controllers/products');


//============Upload Image=====================//

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, './uploads/')
            },
            filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, uniqueSuffix+file.originalname)
            }
        })

        const fileFilter = (req, file, cb) => {
            //reject a file
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype == 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }

        const upload = multer({
            storage:storage, 
            limits: {
                fileSize: 1024 * 1024 * 5   
            },
            fileFilter: fileFilter
        });

//============================================//


//create GET method/route for fetch/retreive all data
router.get('/', ProductsController.products_get_all);


//create POST method/route save data
router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create);


//create GET method/route for fetch/retreive specific data
router.get('/:productId', ProductsController.products_get_specific);


//create PATCH method/route for update/edit data
router.patch('/:productId', checkAuth, ProductsController.products_update);


//create DELETE method/route for delete data
router.delete('/:productId',checkAuth, ProductsController.products_delete);

//exports router object
module.exports = router;