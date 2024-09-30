const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true,
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', 
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
