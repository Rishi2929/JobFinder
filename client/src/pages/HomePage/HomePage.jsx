import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Header from '../../components/Header/Header';
import { Context } from '../../main';
import img4 from '../../assets/img4.png';
import rupee from '../../assets/rupee.png';
import group from '../../assets/Group.png';
import './HomePage.scss';

function HomePage() {
    // State variables
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Context for authentication
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    // Fetch jobs on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/job/list');

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();

                // Extract unique skills from jobs
                const allSkills = data.jobs.reduce((skills, job) => skills.concat(job.skills), []);
                const uniqueSkills = Array.from(new Set(allSkills));

                console.log(uniqueSkills);
                setJobs(data.jobs);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Error state
    if (error) {
        return <p>Error: {error}</p>;
    }

    // Render jobs
    return (
        <div>
            <Header />
            <div className="flexheading">
                <div className='search-box'>
                    {/* Search Input */}
                    <div className='input-box'>
                        <Search color='#9C9C9C' className='search-icon' />
                        <input type='text' className='jobTitleInput' placeholder='Type any job title' />
                    </div>

                    {/* Skills Dropdown and Add Job Button */}
                    <div className="flex-col2">
                        <div className="dropdown">
                            <select>
                                <option value="">Skills</option>
                                {/* Add options if needed */}
                            </select>
                        </div>
                        <div className="add-job-btn">
                            <Link className='job-btn' to={'/add'}>+ Add a job</Link>
                        </div>
                    </div>
                </div>

                {/* Job List */}
                <div className='job-list'>
                    <div>
                        {jobs.map((job) => (
                            <div key={job._id} className='single-job'>
                                {/* Job Icon and Title */}
                                <div className="icon">
                                    <img
                                        src={job.logoURL || 'https://pbs.twimg.com/profile_images/578844000267816960/6cj6d4oZ_400x400.png'}
                                        className='dynamic-img'
                                        alt='Job Logo'
                                        onError={(e) => {
                                            e.target.src = 'https://pbs.twimg.com/profile_images/578844000267816960/6cj6d4oZ_400x400.png';
                                            e.target.alt = 'Default Image Alt Text';
                                        }}
                                    />
                                    <p className='job-title'>{job.JobPosition}</p>
                                </div>

                                {/* Job Details */}
                                <div className="col2">
                                    <div className="details-col2">
                                        <p><img src={group} alt="" className='grp-icon' />11-50</p>
                                        <p><img src={rupee} alt="" className='rupee-icon' />{job.MonthlySalary}</p>
                                        <p>{job.Location}</p>
                                    </div>

                                    {/* Job Skills */}
                                    <div className="right">
                                        {job.skills && job.skills.map((skill, index) => (
                                            <div className="filters" key={index}>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Job Details and Buttons */}
                                <div className="col3">
                                    <div className="flex-details">
                                        <p>{job.remote}</p>
                                        <p>{job.JobType}</p>
                                    </div>

                                    {/* Authenticated Buttons */}
                                    <div className="btn-s">
                                        {isAuthenticated ? (
                                            <div className='flex-btn'>
                                                <Link to={`/edit/${job._id}`} className={`button edit-btn`}>Edit Job</Link>
                                                <Link to={`/details/${job._id}`} className={`button details-btn`}>View Details</Link>
                                            </div>
                                        ) : (
                                            <div className='flex-btn'>
                                                <Link to={`/details/${job._id}`} className={`button details-btn`}>View Details</Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
