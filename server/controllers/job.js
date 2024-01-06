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
export const getFilteredJobs = async (req, res, next) => {
    try {
        const { skills, jobPosition } = req.query;

        if ((!skills || typeof skills !== 'string' || skills.trim() === '') && (!jobPosition || typeof jobPosition !== 'string' || jobPosition.trim() === '')) {
            res.status(400).json({ success: false, message: 'Invalid or missing skills and jobPosition parameters' });
            return;
        }

        let query = {};

        if (skills) {
            query.skills = { $in: skills.split(',') };
        }

        if (jobPosition) {
            query.JobPosition = { $regex: new RegExp(jobPosition, 'i') };
        }

        const jobs = await Job.find(query);

        if (!jobs.length) {
            res.status(404).json({ success: false, message: 'No jobs found with the specified skills and jobPosition' });
            return;
        }

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error('Error filtering jobs:', error);
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
