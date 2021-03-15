//import mongoose package
const mongoose = require('mongoose');

//create model schema
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

//exports model schema
module.exports = mongoose.model('Product', productSchema);