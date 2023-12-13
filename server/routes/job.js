import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { getAllJobs, getFilteredJobs, newJob, updateJob } from "../controllers/job.js";

// Job routes
const jobRouter = express.Router();
jobRouter.post('/new', isAuthenticated, newJob);
jobRouter.put('/:id/update', isAuthenticated, updateJob);
jobRouter.get('/list', getAllJobs);
jobRouter.get('/list/filtered', getFilteredJobs); // New route for filtered jobs
// jobRouter.get('/list/filtered', getFilteredJobs); // New route for filtered jobs



export default jobRouter