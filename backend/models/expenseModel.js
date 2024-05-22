import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    expenseName: {
        type: String,
        required: true,
    },
    budgetName: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

export const Expense = mongoose.model('Expense', expenseSchema)