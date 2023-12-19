import React from 'react';
import './JobPage.scss';
import jobImg from '../../assets/add-jb.png';

function JobPage() {
    return (
        <div className='add-job-page'>
            <div className="left-div">
                <div className="fields">
                    <h1>Add job description</h1>

                    <div className="form-container">
                        <div className="column">
                            <div className="input-container">
                                <label>Company Name</label>
                                <input type="text" placeholder="Enter Job Title" />
                            </div>
                            <div className="input-container">
                                <label>Add logo URL</label>
                                <input type="text" placeholder="Enter the link" />
                            </div>
                            <div className="input-container">
                                <label>Job position</label>
                                <input type="text" placeholder="Enter job position" />
                            </div>
                            <div className="input-container">
                                <label>Monthly salary</label>
                                <input type="text" placeholder="Enter Amount in rupees" />
                            </div>
                            <div className="input-container">
                                <label>Job Type</label>
                                <select id="jobTypeDropdown">
                                    <option value="">Select </option>
                                    <option value="option1">Full-time</option>
                                    <option value="option2">Part-time</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>Remote/office</label>
                                <select id="locationDropdown">
                                    <option value="">Select</option>
                                    <option value="option1">Remote</option>
                                    <option value="option2">Office</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>Location</label>
                                <input type="text" placeholder="Enter Location" />
                            </div>
                            <div className="input-container">
                                <label>Job Description</label>
                                <input type="text" placeholder="Type the job description" className='job-des' />
                            </div>
                            <div className="input-container">
                                <label>About Company</label>
                                <input type="text" placeholder="Type about your company" className='about-com' />
                            </div>
                            <div className="input-container">
                                <label>Skills Required</label>
                                <input type="text" placeholder="Enter the must-have skills" />
                            </div>
                            <div className="input-container">
                                <label>Information</label>
                                <input type="text" placeholder="Enter additional information" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="right-div">
                <img src={jobImg} alt="Job Image" />
            </div>
        </div>
    );
}

export default JobPage;
