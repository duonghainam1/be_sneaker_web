import { StatusCodes } from "http-status-codes";
import Products from "../models/product.js";
import Attribute from "../models/attribute.js";
export const GetAllProduct = async (req, res) => {
    try {
        const products = await Products.find()
            .populate({
                path: 'attributes',
                populate: {
                    path: 'sizes'
                }
            });
        if (!products) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào" });
        }
        products.forEach(product => {
            let totalStock = 0;
            product.attributes.forEach(attribute => {
                attribute.sizes.forEach(size => {
                    totalStock += size.stock;
                });
            });

            if (totalStock === 0) {
                product.status = 'Out of Stock';
            } else if (product.status === 'Discontinued') {
                product.status = 'Discontinued';
            } else {
                product.status = 'Available';
            }
        });

        return res.status(StatusCodes.OK).json({ products });
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Lỗi server" });
    }
}
export const GetProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Products.findById(productId).populate('attributes');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const attributes = await Attribute.find({ productId: productId });
        const sizes = attributes.flatMap(attr => attr.sizes);
        const minPrice = Math.min(...sizes.map(size => size.price));
        const maxPrice = Math.max(...sizes.map(size => size.price));

        res.status(200).json({
            product,
            minPrice,
            maxPrice,
            attributes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const CreateProduct = async (req, res) => {

    try {
        const { name, description, category, sku, status, images, attributes } = req.body;
        const product = new Products({
            name,
            description,
            category,
            sku,
            status,
            images
        });

        const savedProduct = await product.save();
        let attributeIds = [];
        for (let attr of attributes) {
            const { color, images, sizes } = attr;
            const attribute = new Attribute({
                productId: savedProduct._id,
                color,
                images,
                sizes
            });
            const savedAttribute = await attribute.save();
            attributeIds.push(savedAttribute._id);
        }
        savedProduct.attributes = attributeIds;
        await savedProduct.save();
        res.status(201).json({ message: 'Sản phẩm và thuộc tính đã được thêm thành công!', product: savedProduct });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm và thuộc tính:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm sản phẩm và thuộc tính', error });
    }
};

export const DeleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Attribute.deleteMany({ product: id });
        const deletedProduct = await Products.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại." });
        }
        res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
export const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, sku, status, images, attributes } = req.body;
        const updateProduct = await Products.findOneAndUpdate(id,
            { name, description, category, sku, status, images },
            { new: true, runValidators: true }
        )
        if (!updateProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại." });
        }
        let attributeIds = [];
        for (let attr of attributes) {
            let savedAttribute
            if (attr._id) {
                savedAttribute = await Attribute.findByIdAndUpdate(attr._id,
                    { color: attr.color, images: attr.images, sizes: attr.sizes },
                    { new: true, runValidators: true }
                )
            } else {
                const newAttr = new Attribute({
                    productId: id,
                    color: attr.color,
                    images: attr.images,
                    sizes: attr.sizes
                })
                savedAttribute = await newAttr.save();
            }
            attributeIds.push(savedAttribute._id);
        }
        const deleteAttr = await Attribute.deleteMany({
            _id: { $nin: attributeIds },
            productId: updateProduct._id
        })
        updateProduct.attributes = attributeIds;
        await updateProduct.save();
        return res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}
