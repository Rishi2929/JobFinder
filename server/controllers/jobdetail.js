import { JobDetails } from "../models/jobdetails.js";


export const newJob = async (req, res, next) => {
    try {
        const { companyName, logoURL, JobPosition, MonthlySalary, JobType, remote, Location, JobDescription, AboutCompany, SkillsRequired, Information } = req.body;


        const job = await JobDetails.create({
            companyName,
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