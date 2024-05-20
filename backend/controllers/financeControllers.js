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
        const { description, amount, category, paymentMethod, date } = req.body; 
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
        const records = new Record({description, amount, category, paymentMethod, date})
        await records.save();
    
        return res.status(200).send({status:'200', message: "success", records})
    } catch (error) {
        res.status(400).send({message: "failed", cause: error.message})
    }
}

export const deleteRecord = async (req, res) => {
    try {
        const recordId = req.params.recordId;

        // Find the record by ID to ensure it exists
        const recordToDelete = await Record.findById(recordId);
        if (!recordToDelete) {
            return res.status(422).send({ message: "Couldn't find the record" });
        }

        // Delete the record
        await Record.findByIdAndDelete(recordId);

        // Fetch the updated list of records
        const updatedRecords = await Record.find();

        console.log({ recordId });
        console.log({ updatedRecords });

        return res.status(200).send({ message: "Successfully deleted", records: updatedRecords });

    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Failed", cause: error.message });
    }
};