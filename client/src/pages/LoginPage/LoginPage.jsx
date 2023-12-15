import React, { useState } from 'react';
import img from '../../assets/img1.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => { // Corrected function name
        e.preventDefault();
        try {
            console.log('Sending Login request...');
            const { response } = await axios.post('http://localhost:3000/api/v1/user/login', {
                email,
                password,
            });
            // console.log('Login response:', response);
            toast.success(response.data.message);

        } catch (error) {
            // console.log('Login failed', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div>
            <div className="parent-cont">
                <div className="left-div">
                    <h1>Already have an account?</h1>
                    <p>Your personal job finder is here</p>

                    <form onSubmit={handleRegister}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className='btn'>Sign in</button>
                    </form>
                    <p>Don’t have an account?</p>
                    <Link to="/register">Sign Up</Link>

                </div>

                <div className="right-div">
                    <img src={img} className="img1" alt="image" />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
