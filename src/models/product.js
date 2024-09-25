import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        sku: {
            type: String,
            unique: true,
            required: true,
        },
        status: {
            type: String,
            enum: ['Available', 'Out of Stock', 'Discontinued'],
            default: 'Available',
        },
        images: [String], // Array chứa đường dẫn ảnh
        attributes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Attributes',
            },
        ],
    }, { timestamps: true, versionKey: false });

productSchema.plugin(mongoosePaginate);
export default mongoose.model('Products', productSchema);
