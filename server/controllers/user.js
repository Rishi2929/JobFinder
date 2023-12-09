import { User } from '../models/user.js'
import ErrorHandler from '../middleware/error.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res, next) => {
    try {
        const { name, email, password, mobile } = req.body;
        let user = await User.findOne({ email })

        if (user) return next(new ErrorHandler("User Already Exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedPassword, mobile })

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(201).json({ message: 'Registered', token });

    } catch (error) {
        next(error)
    }
}
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.setHeader('Authorization', `Bearer ${token}`);

        res.status(201).json({ message: 'Logged In', token });

    } catch (error) {
        next(error)

    }
}