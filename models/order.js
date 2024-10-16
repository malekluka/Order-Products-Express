const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true // Make sure the productId is required
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
