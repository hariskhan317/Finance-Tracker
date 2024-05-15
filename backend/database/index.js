import mongoose from "mongoose";

export const mongooseConnection = async() => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected successfully')
    } catch (error) {
        console.log("Can't connect", error)
    }
}