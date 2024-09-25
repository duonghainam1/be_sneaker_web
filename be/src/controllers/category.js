import { StatusCodes } from "http-status-codes";
import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";
export const create = async (req, res) => {
    try {
        const categoy = await Category.create({
            category_name: req.body.category_name,
            category_image: req.body.category_image,
            slug: slugify(req.body.category_name, "-"),
        });

        return res.status(StatusCodes.CREATED).json(categoy);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getAll = async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(StatusCodes.OK).json([]);
        }
        return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
export const getCategoryById = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });
        const category = await Category.findById(req.params.id);
        if (category.length === 0)
            return res
                .status(StatusCodes.OK)
                .json({ message: "Không tìm thấy sản phẩm nào!" });
        return res.status(StatusCodes.OK).json({
            category,
            products,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
export const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json(category);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
export const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json(category);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
