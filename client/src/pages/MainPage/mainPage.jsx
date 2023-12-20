import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import './mainPage.scss';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import img4 from '../../assets/img4.png'
import rupee from '../../assets/rupee.png'
import group from '../../assets/Group.png'
import { Context } from '../../main';



function MainPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)


    useEffect(() => {

        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/job/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();

                // console.log(data)
                setJobs(data.jobs);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }


    jobs.map(job => {
        let skill = job.SkillsRequired
        console.log("JObs", skill)
    })


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
                            <select>
                                <option value="">Skills</option>

                            </select>

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
                                <div className="icon">
                                    <img src={img4} />
                                    <p className='job-title'>{job.JobPosition}</p>

                                </div>
                                <div className="col2">
                                    <div className="details-col2">
                                        <p><img src={group} alt="" className='grp-icon' />11-50</p>
                                        <p><img src={rupee} alt="" className='rupee-icon' />{job.MonthlySalary}</p>
                                        <p>{job.Location}</p>
                                    </div>
                                    <div className="right">
                                        {job.skills && job.skills.map((skill, index) => (
                                            <div className="filters" key={index}>
                                                {skill}
                                            </div>
                                        ))}
                                    </div>


                                </div>
                                <div className="col3">
                                    <div className="flex-details">
                                        <p>{job.remote}</p>
                                        <p>{job.JobType}</p>
                                    </div>
                                    <div className="btn-s">

                                        {isAuthenticated ?
                                            <div className='flex-btn'>
                                                <Link to="/details" className={`button edit-btn`}>Edit Job</Link>
                                                <Link to="/details" className={`button details-btn`}>View Details</Link>
                                            </div>
                                            :
                                            <div className='flex-btn'>
                                                <Link to="/details" className={`button details-btn`}>View Details</Link>
                                            </div>
                                        }

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
