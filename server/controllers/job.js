import ErrorHandler from "../middleware/error.js";
import { Job } from "../models/job.js";


export const newJob = async (req, res, next) => {
    try {
        const { companyName, logoURL, JobPosition, MonthlySalary, JobType, remote, Location, JobDescription, AboutCompany, skills, Information } = req.body;

        const job = await Job.create({
            companyName,
            logoURL,
            JobPosition,
            MonthlySalary,
            JobType,
            remote,
            Location,
            JobDescription,
            AboutCompany,
            skills,
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
export const getJobById = async (req, res, next) => {
    try {

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        next(error);
    }
};

// controllers/job.js
// controllers/job.js
// controllers/job.js

export const getFilteredJobs = async (req, res, next) => {
    try {
        const { skills, jobPosition } = req.query;

        // Build the filter criteria based on the provided query parameters
        const filterCriteria = {};

        if (skills) {
            // Convert skills to an array if it's a comma-separated string
            const skillsArray = skills.split(',');
            filterCriteria.skills = { $in: skillsArray };
        }

        if (jobPosition) {
            filterCriteria.JobPosition = { $regex: new RegExp(jobPosition, 'i') };
        }

        // Perform the filtered query
        const filteredJobs = await Job.find(filterCriteria);

        if (filteredJobs.length === 0) {
            return res.status(404).json({ success: false, message: 'No matching jobs found' });
        }

        res.status(200).json({ success: true, jobs: filteredJobs });
    } catch (error) {
        console.error('Error fetching filtered jobs:', error);
        next(error);
    }
};





// controllers/job.js
export const getSkills = async (req, res, next) => {
    try {
        const allSkills = await Job.distinct('skills');
        res.status(200).json({ success: true, skills: allSkills });
    } catch (error) {
        console.error('Error fetching skills:', error);
        next(error);
    }
};
