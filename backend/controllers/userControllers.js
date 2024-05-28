import { User } from '../models/userModel.js';
import brcypt from 'bcrypt';
import {createToken} from '../utils/tokenManager.js'

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status('200').send(users);
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', cause:error.message });
    }
}

export const userAuthStatus = async(req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
    
        if (!user) {
            return res.status(400).send({ message: 'Cant find user' });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(400).send({ message: 'Not same' });
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', cause:error.message });
    }
}

export const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await brcypt.hash(password, 10)
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: 'Already Register' });
        }
        const user = new User({ name, email, password: hashPassword })
        await user.save();

        res.clearCookie('auth_token',{ httpOnly: true, secure: true, sameSite: 'None' });
        const expiryDate = new Date(Date.now() + 36000000); // 1 day
        const token = createToken(user._id, user.email); 
        
        return res.cookie('auth_token', token, {
            expires: expiryDate,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'None',
        }).status(200).send({ status: 200, message: "Successfull SignUp!", name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).send({    message: 'Internal Server Error', cause:error.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'cant find user' });
        }
        const verifyPassword = await brcypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(422).send({ message: 'Password is not same' });
        } 

        res.clearCookie('auth_token',{ httpOnly: true, secure: true, sameSite: 'None' }) 
        const expiryDate = new Date(Date.now() + 36000000); // 1 day
        const token = createToken(user._id, user.email); 

        return res.cookie('auth_token', token, {
            expires: expiryDate,
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'None',
        }).status(200).send({ status: 200, message: "Successfull Login!", name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error', cause:error.message });
    }
}

export const userLogout = async (req, res) => {
    try {
        console.log('Starting userLogout');

        // Check for jwtData in res.locals
        const userId = res.locals.jwtData?.id;
        if (!userId) { 
            return res.status(400).send({ message: 'JWT data not found' });
        }

        const user = await User.findById(userId);
        console.log('Found user:', user);

        if (!user) {
            return res.status(400).send({ message: 'Cannot find user' });
        }

        if (user._id.toString() !== userId) {
            return res.status(400).send({ message: 'User ID mismatch' });
        }
 
        res.clearCookie('auth_token', { httpOnly: true, secure: true });

        return res.status(200).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).send({ message: 'Internal Server Error', cause: error.message });
    }
};