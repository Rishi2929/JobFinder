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

        // job.companyName = req.body.companyName;
        // job.logoURL = req.body.logoURL;
        // job.JobPosition = req.body.JobPosition;
        // job.MonthlySalary = req.body.MonthlySalary;
        // job.JobType = req.body.JobType;
        // job.remote = req.body.remote;
        // job.Location = req.body.Location;
        // job.JobDescription = req.body.JobDescription;
        // job.AboutCompany = req.body.AboutCompany;
        // job.Information = req.body.Information;
        // job.skills = req.body.skills;




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
        const { skills } = req.query;

        if (!skills || typeof skills !== 'string' || skills.trim() === '') {
            res.status(400).json({ success: false, message: 'Invalid or missing skills parameter' });
            return;
        }

        const jobs = await Job.find({ skills: { $in: skills.split(',') } });

        if (!jobs.length) {
            res.status(404).json({ success: false, message: 'No jobs found with the specified skills' });
            return;
        }

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error('Error filtering jobs by skills:', error);
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
