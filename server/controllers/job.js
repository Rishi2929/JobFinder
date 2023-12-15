import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/job.js";


export const newJob = async (req, res, next) => {
    try {
        const { companyName, recruiterName, logoURL, JobPosition, MonthlySalary, JobType, remote, Location, JobDescription, AboutCompany, SkillsRequired, Information } = req.body;

        const job = await Job.create({
            companyName,
            recruiterName,
            logoURL,
            JobPosition,
            MonthlySalary,
            JobType,
            remote,
            Location,
            JobDescription,
            AboutCompany,
            SkillsRequired,
            Information,
            user: req.user,
        });

        res.status(201).json({ message: 'Job posted successfully', job });

    } catch (error) {
        next(error);
    }
}

export const updateJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return next(new ErrorHandler("Job not found", 404))

        Object.assign(job, req.body);

        await job.save();


        res.status(200).json({
            success: true,
            message: "Job Updated!"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        next(error);
    }
};

// controllers/job.js
export const getFilteredJobs = async (req, res, next) => {
    try {
        const { skills } = req.query;

        if (!skills) {
            return next(new ErrorHandler('Skills parameter is required for filtering jobs.', 400));
        }
        const skillsArray = skills.split(',');

        const jobs = await Job.find({ SkillsRequired: { $in: skillsArray } });

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        // Handle errors
        console.error('Error filtering jobs by skills:', error);
        next(error);
    }
};
