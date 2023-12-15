import React, { useState } from 'react';
import './RegisterPage.scss';
import img from '../../assets/img1.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            console.log('Sending registration request...');
            const response = await axios.post('http://localhost:3000/api/v1/user/register', {
                name,
                email,
                mobile,
                password,
            });

            console.log('Registration response:', response);

            if (response.data && response.data.message) {
                toast.success(response.data.message);
            } else {
                console.error('Unexpected response format:', response);
                toast.error('Unexpected response format');
            }

        } catch (error) {
            console.error('Registration failed', error);
            toast.error(error.response.data.message);
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
                            <input type='checkbox' className='checkbox' />
                            By creating an account, I agree to our terms of use and privacy policy

                        </label>

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
