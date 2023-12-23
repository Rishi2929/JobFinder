import React, { useEffect, useState } from 'react';
import './EditJobPage.scss';
import jobImg from '../../assets/add-jb.png';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { server } from '../../main';
function EditJobPage() {
    const [companyName, setCompanyName] = useState("")
    const [logoURL, setLogoUrl] = useState("")
    const [JobPosition, setJobPosition] = useState("")
    const [MonthlySalary, setMonthlySalary] = useState("")
    const [JobType, setJobType] = useState("")
    const [remote, setRemote] = useState("")
    const [Location, setLocation] = useState("")
    const [JobDescription, setJobDescription] = useState("")
    const [AboutCompany, setAboutCompany] = useState("")
    const [skills, setSkills] = useState([])
    const [Information, setInformation] = useState("")

    //Submit Button
    const { jobId } = useParams();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get(`${server}/api/v1/job/list/${jobId}`);
                const jobDetails = response.data.job;

                setCompanyName(jobDetails.companyName);
                setLogoUrl(jobDetails.logoURL);
                setJobPosition(jobDetails.JobPosition);
                setMonthlySalary(jobDetails.MonthlySalary);
                setJobType(jobDetails.JobType);
                setRemote(jobDetails.remote);
                setLocation(jobDetails.Location);
                setJobDescription(jobDetails.JobDescription);
                setAboutCompany(jobDetails.AboutCompany);
                setSkills(jobDetails.skills.join(', '));
                setInformation(jobDetails.Information);
            } catch (error) {
                console.error('Error fetching job details:', error);
                // Handle error as needed
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const updateJob = async () => {
        try {
            const token = localStorage.getItem('token');
            const updatedJob = {
                companyName,
                logoURL,
                JobPosition,
                MonthlySalary,
                JobType,
                remote,
                Location,
                JobDescription,
                AboutCompany,
                skills: skills.split(',').map(skill => skill.trim()), // Convert skills string to array
                Information,
            };
            // console.log(updatedJob); 
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',

                },
            };


            await axios.put(`${server}/api/v1/job/update/${jobId}`, updatedJob, config);
            toast.success('Job updated successfully');
        } catch (error) {
            console.error('Error updating job:', error);
            // Handle error as needed
        }
    };

    return (
        <div className='add-job-page'>
            <div className="left-div">
                <div className="fields">
                    <h1>Add job description</h1>
                    <div className="form-container">
                        <div className="column">
                            <div className="input-container">
                                <label>Company Name</label>
                                <input type="text" placeholder="Enter Job Title" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Add logo URL</label>
                                <input type="text" placeholder="Enter the link" value={logoURL} onChange={(e) => setLogoUrl(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Job position</label>
                                <input type="text" placeholder="Enter job position" value={JobPosition} onChange={(e) => setJobPosition(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Monthly salary</label>
                                <input type="text" placeholder="Enter Amount in rupees" value={MonthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Job Type</label>
                                <select id="JobTypeDropdown" value={JobType} onChange={(e) => setJobType(e.target.value)} required >
                                    <option value="">Select </option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>Remote/office</label>
                                <select id="LocationDropdown" value={remote} onChange={(e) => setRemote(e.target.value)} required >
                                    <option value="">Select</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Office">Office</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>Location</label>
                                <input type="text" placeholder="Enter Location" value={Location} onChange={(e) => setLocation(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Job Description</label>
                                <input type="text" placeholder="Type the job description" className='job-des' value={JobDescription} onChange={(e) => setJobDescription(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>About Company</label>
                                <input type="text" placeholder="Type about your company" className='about-com' value={AboutCompany} onChange={(e) => setAboutCompany(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Skills Required </label>
                                <input type="text" placeholder="Enter the must-have Skills" value={skills} onChange={(e) => setSkills(e.target.value)} required />
                            </div>
                            <div className="input-container">
                                <label>Information</label>
                                <input type="text" placeholder="Enter additional Information" value={Information} onChange={(e) => setInformation(e.target.value)} required />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btns">
                    <Link to={'/'} className='cancel-btn'>Cancel</Link>
                    <Link to={'/'} onClick={updateJob} className='add-job-btn'> Update Job</Link>

                </div>
            </div>
            <div className="right-div">
                <img src={jobImg} alt="Job Image" />
            </div>
        </div>
    );
}

export default EditJobPage;
