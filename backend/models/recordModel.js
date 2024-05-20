import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }
})

export const Record = mongoose.model('Record',recordSchema)