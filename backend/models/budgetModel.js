import mongoose from "mongoose";

export const budgetSchema = new mongoose.Schema({
    budgetName: {
        type: String,
        required: true, 
        sparse: true
    },
    budgetAmount: {
        type: Number,
        required: true,
    },
    expenseAmount: {
        type: Number, 
    },
    color: {
        type: String,
        required: true,
    }
})

export const Budget = mongoose.model('Budget', budgetSchema)