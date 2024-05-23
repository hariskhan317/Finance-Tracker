import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    budgetName: {
        type: String,
        required: true,
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

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
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

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    budget: [budgetSchema],
    expense: [expenseSchema],
});

export const User = mongoose.model('User', userSchema);
