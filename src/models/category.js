import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        category_name: {
            type: String,
        },
        category_slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        category_image: {
            type: String,
        },
    },
    { timestamps: true, versionKey: false }
);
export default mongoose.model("Category", categorySchema);
