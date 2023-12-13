import express from "express";
import isAuthenticated from "../middleware/auth.js";
import { newJob, updateJob } from "../controllers/job.js";

// Job routes
const jobRouter = express.Router();
jobRouter.post('/new', isAuthenticated, newJob);
jobRouter.put('/:id/update', isAuthenticated, updateJob);

export default jobRouter