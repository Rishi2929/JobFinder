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

        res.status(201).json({ message: 'Registered', token, name: user.name });

    } catch (error) {
        next(error)
    }
}
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        console.log(email)


        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.setHeader('Authorization', `Bearer ${token}`);
        console.log(User.name)

        res.status(201).json({ message: 'Logged In', token, name: user.name });

    } catch (error) {
        next(error)

    }
}
export const Logout = async (req, res, next) => {
    try {
        // Clear the authorization header of the request
        res.setHeader('Authorization', '');

        // Invalidate the JWT token (optional)
        // You can implement token blacklisting or other techniques for token invalidation
        // jwt.decode(req.header('Authorization').split(' ')[1]); // Get token from header
        // // Implement token invalidation logic here

        // Send a success response
        res.status(200).json({ message: 'Logged Out', });
    } catch (error) {
        next(error);
    }
};
