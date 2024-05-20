import { Record } from '../models/recordModel.js';
import { User } from '../models/userModel.js'

export const getRecord = async (req, res) => {
    try {
        const records = await Record.find();  
        res.status(200).send(records)
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}

export const addRecord = async(req, res) => {
    try {
        const { description, amount, category, paymentMethod } = req.body;
        // user Verifications
        // const user = await User.findById(res.locals.jwtData.id);
        // if (!user) {
        //     return res.status(400).status("cant find the user");
        // }
        // if (user._id !== res.locals.jwtData.id) {
        //     return res.status(400).status("cant Match the user");
        // }
        // if (verification) {
            
        // }
        // // 
        const records = new Record({description, amount, category, paymentMethod})
        await records.save();
    
        res.status(200).send({status:'200', message: "success", records})
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}
