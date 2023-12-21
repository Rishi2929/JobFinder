import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobPositionFilter, setJobPositionFilter] = useState('');
    const [skillsFilter, setSkillsFilter] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/job/list/filtered', {
                    params: {
                        JobPosition: jobPositionFilter,
                        skills: skillsFilter.join(','),
                    },
                });

                setJobPosts(response.data.JobPosts);
                console.log("Jobs", response);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [jobPositionFilter, skillsFilter]);

    const handleJobPositionChange = (e) => {
        setJobPositionFilter(e.target.value);
    };

    const handleSkillsChange = (e) => {
        const selectedSkills = Array.from(e.target.selectedOptions, (option) => option.value);
        setSkillsFilter(selectedSkills);
    };

    return (
        <div>
            <h1>Filtered Job List</h1>
            <div>
                <label htmlFor="jobPosition">Job Position:</label>
                <input
                    type="text"
                    id="jobPosition"
                    value={jobPositionFilter}
                    onChange={handleJobPositionChange}
                />
            </div>
            <div>
                <label htmlFor="skills">Skills:</label>
                <select
                    id="skills"
                    multiple
                    value={skillsFilter}
                    onChange={handleSkillsChange}
                >
                    {/* Add your skill options dynamically here */}
                    <option value="CSS">Skill 1</option>
                    <option value="skill2">Skill 2</option>
                    {/* Add more skills as needed */}
                </select>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {jobPosts.map((job) => (
                        <li key={job._id}>
                            <p>Job Position: {job.JobPosition}</p>
                            <p>Skills: {job.skills.join(', ')}</p>
                            {/* Add other job details as needed */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobList;
