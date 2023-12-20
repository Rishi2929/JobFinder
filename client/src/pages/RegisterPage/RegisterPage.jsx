import React, { useContext, useState } from 'react';
import './RegisterPage.scss';
import img from '../../assets/img1.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Context } from '../../main';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [checkBoxError, setCheckBoxError] = useState("");
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)


    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setCheckBoxError('');
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setCheckBoxError(false);


        if (!isChecked) {
            setCheckBoxError(true);
        }
        else {

            try {
                console.log('Sending registration request...');
                const response = await axios.post('http://localhost:3000/api/v1/user/register', {
                    name,
                    email,
                    mobile,
                    password,
                });

                // console.log('Registration response:', response);
                localStorage.setItem('Recruiter Name', JSON.stringify(response.data.name)); // Store user information


                if (response.data && response.data.message) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    toast.success(response.data.message);
                    setIsAuthenticated(true);

                    navigate('/')
                } else {
                    // console.error('Unexpected response format:', response);
                    toast.error('Unexpected response format');
                }

            } catch (error) {
                // console.error('Registration failed', error);
                toast.error("All fields are required");
            }
        }
    };


    return (
        <div>
            <div className="parent-cont">
                <div className="left-div">
                    <h1>Create an account</h1>
                    <p>Your personal job finder is here</p>

                    <form onSubmit={handleRegister}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="number" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>
                            <input type='checkbox' className='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
                            By creating an account, I agree to our terms of use and privacy policy
                        </label>

                        {checkBoxError ? <label className="checkbox_msg">Check this box if you want to proceed</label> : ""}


                        <button type="submit" className='btn'>Create Account</button>
                    </form>
                    <div className="bottom-cont">
                        <p>Don’t have an account?</p>
                        <Link to="/login">Sign In</Link>
                    </div>

                </div>

                <div className="right-div">
                    <img src={img} className="img1" alt="image" />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
