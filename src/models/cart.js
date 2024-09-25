import mongoose, { Schema } from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Products',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            total_price_item: {
                type: Number,
                required: true,
            },
            color: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            status_checked: {
                type: Boolean,
                required: true,
            },
        }
    ],
    total_price: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);
