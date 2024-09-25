
import attribute from '../models/attribute.js';


export const get_Attributes_Products_All = async (req, res) => {
    try {
        const attributes = await attribute.find().populate('product').exec();
        console.log(attributes);

        res.status(200).json(attributes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const create_Attribute = async (req, res) => {
    try {
        const { product, varriants } = req.body;
        const formattedVariants = varriants.map(variant => ({
            color: variant.color,
            size: variant.size.map(size => ({
                name_size: size.name_size,
                stockBySize: size.stockBySize,
                priceBySize: size.priceBySize
            }))
        }));
        const newAttribute = new Attribute({
            product,
            varriants: formattedVariants,
        });
        await newAttribute.save();
        res.status(201).json({ message: 'Attribute created successfully', newAttribute });
    } catch (error) {
        console.error('Error creating attribute:', error);
        res.status(500).json({ message: 'Error creating attribute', error });
    }
};


export const get_Attributes_Products_ById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find attributes for the given product ID and populate product details
        const attributes = await Attribute.findOne({ product: id }).populate('product').exec();

        if (!attributes) {
            return res.status(404).json({ message: 'Thuộc tính sản phẩm không tìm thấy' });
        }

        res.status(200).json(attributes);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};
