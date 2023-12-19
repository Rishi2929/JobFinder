import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import './mainPage.scss';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';


function MainPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/job/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();

                console.log(data)

                // if (data.success && Array.isArray(data.jobs)) {
                setJobs(data.jobs);
                // } else {
                //     throw new Error('Fetched data does not contain a valid jobs array');
                // }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <Header />
            <div className="flexheading">
                <div className='search-box'>
                    <div className='input-box'>
                        <Search color='#9C9C9C' className='search-icon' />
                        <input type='text' className='jobTitleInput' placeholder='Type any job title' />
                    </div>
                    <div className="flex-col2">
                        <div className="dropdown">
                            <button>ljkljkfdldjfkljs</button>

                        </div>
                        <div className="add-job-btn">
                            <Link className='job-btn' to={'/add'}>+ Add a job</Link>
                        </div>
                    </div>
                </div>
                <div className='job-list'>
                    <div>
                        {jobs.map((job) => (
                            <div key={job._id} className='single-job'>
                                <p className='job-title'>{job.JobPosition}</p>
                                <div className="col2">
                                    <div className="details-col2">
                                        <p>11-50</p>
                                        <p>{job.MonthlySalary}</p>
                                        <p>{job.Location}</p>
                                    </div>
                                    <div className="right">
                                        {job.SkillsRequired && job.SkillsRequired.map((skill, index) => (
                                            <div className="filters" key={index}>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>


                                </div>
                                <div className="col3">
                                    <div className="flexdetails">
                                        <p>{job.remote}</p>

                                        <p>{job.JobType}</p>
                                    </div>
                                    <div className="btns">
                                        <div className='flex-btn'>
                                            <Link to="/details" className='details-btn'>View Details</Link>
                                            <Link to="/details" className='edit-btn'>Edit Job</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div >
    );
}

export default MainPage;
