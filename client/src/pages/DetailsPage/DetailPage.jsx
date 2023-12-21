import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './DetailsPage.scss'
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailPage() {

    const [job, setJob] = useState({});
    const { jobId } = useParams();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/job/list/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const data = await response.json();
                setJob(data.job);
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };

        fetchJobDetails();
    }, [jobId]);



    return (
        <div className='detail-div'>
            <Header />
            <div className="title-div">
                <h3>{job.JobPosition} job/internship at <p>{job.companyName}</p></h3>
            </div>
            <div className="main-details">
                <div className="row-1">
                    <p>1w ago</p>
                    <p>Full Time</p>
                </div>
                <div className="row-2">
                    <h1>{job.JobPosition} </h1>
                </div>
                <div className="row-3">
                    <p>{job.Location}</p>
                </div>
                <div className="row-4">
                    <div className="flex-row-4">
                        <Icon icon="ph:money-fill" ></Icon>
                        <p>Stipend</p>
                    </div>
                    <p>{job.MonthlySalary}</p>
                </div>
                <div className="row 5">
                    <h3>About Company</h3>
                    <p>{job.AboutCompany}</p>
                </div>
                <div className="row 6">
                    <h3>About the  job/internship</h3>
                    <p>{job.JobDescription}</p>
                </div>
                <div className="row skill">
                    <h3>Skill(s) required</h3>
                    <div className="flex-skills">
                        {job.skills && job.skills.map((skill, index) => (
                            <div key={index} className="skill-box">
                                <p>{skill}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row 8">
                    <h3>Additional Information</h3>
                    <p>{job.Information}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailPage