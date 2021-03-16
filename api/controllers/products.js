
//import mongoose package
const mongoose = require('mongoose');

//import Product model
const Product = require('../models/product');



//middleware function for fetch/retreive all products
exports.products_get_all = (req, res, next) => {
    Product.find()
           .select('name price _id productImage')
           .exec()
           .then(docs => {
               if (docs.length > 0) {
                   const response = {
                       count: docs.length,
                       products: docs.map(doc => {
                           return {
                               name: doc.name,
                               price: doc.price,
                               productImage: doc.productImage,
                               _id: doc._id,
                               request: {
                                   type: 'GET',
                                   url: 'http://localhost:3000/products/' + doc._id
                               }
                           }
                       })
                   };
                   res.status(200).json(response);
               } else {
                   res.status(404).json({
                       message: 'No entries found!'
                   });
               }
               
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
}



//middleware function for create new product
exports.products_create = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product.save()
           .then(result => {
               console.log(result);
               res.status(201).json({
               message: 'Created product successfully.',
               createdProduct: {
                   name: result.name,
                   price: result.price,
                   productImage: result.productImage,
                   _id: result._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:3000/products/' + result._id
                   }
               }
            });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error: err
               });
            });
}



//middleware function for fetch/retreive specific product
exports.products_get_specific = (req, res, next) => {
    //hold/extract productID value
    const id = req.params.productId;

    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log('From Database',doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all products',
                        url: 'http://localhost:3000/products'
                    }
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}


//middleware function for update products
exports.products_update = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateMany({_id: id}, {$set: updateOps})
           .exec()
           .then(result => {
               res.status(200).json({
                   message: 'Product updated successfully.',
                   request: {
                       type: 'GET',
                       url: 'http://localhost:3000/products/' + id
                   }
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
}


//middleware function for delete products
exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
           .exec()
           .then(result => {
               res.status(200).json({
                   message: 'Product deleted successfully',
                   request: {
                       type: 'POST',
                       url: 'http://localhost:3000/products',
                       body: { name: 'String', price: 'Number' }
                   }
               });
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error: err
               });
           });
}