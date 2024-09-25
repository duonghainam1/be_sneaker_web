import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { signupSchema } from "../validate/signup_Schema.js";



export const getAuth = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có user nào" });
        }
        return res.status(StatusCodes.OK).json({
            user,
        });
    } catch (error) {
        console.log(error);

    }
}
export const signup = async (req, res) => {
    const { email, password, name, avatar } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    console.log(error);
    if (error) {
        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Email đã tồn tại"],
        });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
        role,
    });

    return res.status(StatusCodes.CREATED).json({
        user,
    });
};
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
            messages: ["Email không tồn tại"],
        });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            messages: ["Mật khẩu không chính xác"],
        });
    }
    const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "7d",
    });
    return res.status(StatusCodes.OK).json({
        user,
        token,
    });
};
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Không thể đăng xuất. Vui lòng thử lại sau.' });
            }
            res.status(200).json({ message: 'Đăng xuất thành công.' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng xuất.' });
    }
};