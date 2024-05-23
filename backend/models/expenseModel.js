import mongoose from "mongoose";

export const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
        // unique: true,
        // sparse: true
    },
    budgetName: {
        type: String,
        required: true,
    },
    expenseAmount: {
        type: Number,
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