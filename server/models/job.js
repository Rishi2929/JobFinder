import mongoose, { mongo } from "mongoose";
const schema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    logoURL: {
        type: String,
        required: true
    },
    JobPosition: {
        type: String,
        required: true
    },
    MonthlySalary: {
        type: String,
        required: true
    },
    JobType: {
        type: String,
        enum: ['Full-time', 'Part-time'],
        required: true
    },
    remote: {
        type: String,
        enum: ['Remote', 'Office'],
        required: true,
    },
    Location: {
        type: String,
        required: true
    },
    JobDescription: {
        type: String,
        required: true
    },
    AboutCompany: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    Information: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


})
export const Job = mongoose.model("Job", schema)