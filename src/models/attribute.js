import mongoose from 'mongoose';

const attributeSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    images: [String],
    sizes: [
        {
            size: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            stock: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timestamps: true, versionKey: false });

export default mongoose.model('Attributes', attributeSchema);
