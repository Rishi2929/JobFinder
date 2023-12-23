import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import Header from '../../components/Header/Header';
import './DetailsPage.scss';
import { server } from '../../main';

function DetailPage() {
    // State for holding job details
    const [job, setJob] = useState({});
    // Extracting jobId from URL parameters
    const { jobId } = useParams();

    useEffect(() => {
        // Function to fetch job details from the API
        const fetchJobDetails = async () => {
            try {
                // Fetch job details using axios
                const response = await axios.get(`${server}/api/v1/job/list/${jobId}`);
                // Update state with the fetched job details
                setJob(response.data.job);
            } catch (error) {
                // Handle errors during the API request
                console.error('Error fetching job details:', error.message);
            }
        };

        // Call the fetchJobDetails function when the component mounts or jobId changes
        fetchJobDetails();
    }, [jobId]);

    // JSX to render the job details page
    return (
        <div className='detail-div'>
            {/* Header component */}
            <Header />
            <div className="title-div">
                {/* Job title and company name */}
                <h3>{job.JobPosition} job/internship at <p>{job.companyName}</p></h3>
            </div>
            <div className="main-details">
                {/* Rows displaying various details */}
                <div className="row-1">
                    <p>1w ago</p>
                    <p>Full Time</p>
                </div>
                <div className="row-2">
                    <h1>{job.JobPosition}</h1>
                </div>
                <div className="row-3">
                    <p>{job.Location}</p>
                </div>
                <div className="row-4">
                    {/* Displaying salary information */}
                    <div className="flex-row-4">
                        <Icon icon="ph:money-fill" />
                        <p>Stipend</p>
                    </div>
                    <p>{job.MonthlySalary}</p>
                </div>
                <div className="row 5">
                    {/* About Company section */}
                    <h3>About Company</h3>
                    <p>{job.AboutCompany}</p>
                </div>
                <div className="row 6">
                    {/* About the job/internship section */}
                    <h3>About the job/internship</h3>
                    <p>{job.JobDescription}</p>
                </div>
                <div className="row skill">
                    {/* Displaying required skills */}
                    <h3>Skill(s) required</h3>
                    <div className="flex-skills">
                        {job.skills?.map((skill, index) => (
                            <div key={index} className="skill-box">
                                <p>{skill}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row 8">
                    {/* Additional Information section */}
                    <h3>Additional Information</h3>
                    <p>{job.Information}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
