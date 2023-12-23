import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Header from '../../components/Header/Header';
import { Context } from '../../main';
import img4 from '../../assets/X.png';
import rupee from '../../assets/rupee.png';
import group from '../../assets/Group.png';
import './HomePage.scss';

function HomePage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const [skills, setSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/job/skills')
            .then(response => response.json())
            .then(data => setSkills(data.skills))
            .catch(error => console.error('Error fetching skills:', error));
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                let filteredUrl = 'http://localhost:3000/api/v1/job/list';

                // Add search term to the URL if present
                if (searchTerm) {
                    filteredUrl += `?JobPosition=${encodeURIComponent(searchTerm)}`;
                } else if (selectedSkills.length > 0) {
                    const skillsQueryParam = selectedSkills.join(',');
                    filteredUrl = `http://localhost:3000/api/v1/job/filtered?skills=${skillsQueryParam}`;
                }

                const response = await fetch(filteredUrl);

                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }

                const data = await response.json();

                setJobs(data.jobs);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [selectedSkills, searchTerm]);
    const fetchJobs = async () => {
        try {
            let filteredUrl = 'http://localhost:3000/api/v1/job/list';

            if (searchTerm) {
                filteredUrl += `?JobPosition=${encodeURIComponent(searchTerm)}`;
                console.log(filteredUrl)
            } else if (selectedSkills.length > 0) {
                const skillsQueryParam = selectedSkills.join(',');
                filteredUrl = `http://localhost:3000/api/v1/job/filtered?skills=${skillsQueryParam}`;
            }

            const response = await fetch(filteredUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();

            setJobs(data.jobs);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [selectedSkills, searchTerm]);

    const handleSkillChange = (event) => {
        const skillValue = event.target.value;

        if (!selectedSkills.includes(skillValue)) {
            setSelectedSkills([...selectedSkills, skillValue]);
        }
    };

    const removeSkill = (skillToRemove) => {
        const updatedSkills = selectedSkills.filter(skill => skill !== skillToRemove);
        setSelectedSkills(updatedSkills);
    };
    const handleKeyPress = (event) => {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === 'Enter') {
            // Trigger the search
            console.log("first")
            fetchJobs();
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Render jobs
    return (
        <div>
            <Header />
            <div className="flexheading">
                <div className='search-box'>
                    {/* Search Input */}
                    <div className='input-box'>
                        <Search color='#9C9C9C' className='search-icon' />
                        <input
                            type='text'
                            className='jobTitleInput'
                            placeholder='Type any job title and press Enter to search'
                            value={searchTerm}
                            onChange={handleSearch}
                            onKeyPress={handleKeyPress} // Added onKeyPress event
                        />
                    </div>

                    {/* Skills Dropdown and Add Job Button */}
                    <div className="flex-col2">
                        <div className="dropdown">
                            <select value={''} onChange={handleSkillChange}>
                                <option value="" disabled>Select Skills</option>
                                {skills.map(skill => (
                                    <option key={skill} value={skill}>
                                        {skill}
                                    </option>
                                ))}
                            </select>
                            <div className="selected-skills">
                                {selectedSkills.map((skill, index) => (
                                    <div className="selected-skill" key={index}>
                                        {skill}
                                        <div className="X-icon">
                                            <X
                                                strokeWidth={2}
                                                size={30}
                                                onClick={() => removeSkill(skill)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Btn will only appear when user is logged in */}
                        {isAuthenticated ? (<div className="add-job-btn">
                            <Link className='job-btn' to={'/add'}>+ Add a job</Link>
                        </div>) : (<div></div>)}

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

// Export the HomePage component
export default HomePage;
