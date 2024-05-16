import { User } from '../models/userModel.js';
import brcypt from 'bcrypt';
import {createToken} from '../utils/tokenManager.js'

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status('200').send(users);
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const userSignin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await brcypt.hash(password, 10)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'Already Register' });
        }
        const user = new User({ name, email, password: hashPassword })
        const token = createToken(name, email);
        console.log(token)

        await user.save();
        return res.status(200).send({ status: 200, message: "Successfull SignIn!", user });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
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
        const token = createToken(user._id, user.email);
        console.log(token)

        return res.status(200).send({ status: 200, message: "Successfull Login!", name: user.name, email: user.email });
    } catch (error) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}