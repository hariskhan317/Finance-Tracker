import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    budgetName: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

export const Budget = mongoose.model('Budget', budgetSchema)