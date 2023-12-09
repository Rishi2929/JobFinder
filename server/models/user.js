import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
    }
    , createAt: {
        type: Date,
        default: Date.now
    }
})
export const User = mongoose.model("User", schema)