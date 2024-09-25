import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [],
    orderNumber: {
        type: String,
    },
    customerInfo: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        // email: {
        //     type: String,
        //     required: true,
        // },

        address: {
            type: String,
            require: true
        },
        address_detail: {
            type: String,
            require: true
        }
    },
    payment: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6"], // 1:Chờ xác nhận, 2:Đang xử lý, 3:Đang giao, 4:Đã giao, 5:Đã hủy, 6:Hoàn thành
        default: "1",
    },
    statusHistory: [
        {
            status: {
                type: String,
                enum: ["1", "2", "3", "4", "5", "6"],
                required: true,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },



}, { timestamps: true, versionKey: false });
orderSchema.pre('save', function (next) {
    if (!this.isModified('orderNumber')) {
        const timestamp = new Date().getTime();
        const random = Math.floor(1000 + Math.random() * 9000);
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});;
export default mongoose.model("Orders", orderSchema);