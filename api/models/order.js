//import mongoose package
const mongoose = require('mongoose');

//create model schema
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1}
});

//exports model schema
module.exports = mongoose.model('Order', orderSchema);