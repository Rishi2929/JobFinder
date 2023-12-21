import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../../main';
import img from '../../assets/img1.png';
import './LoginPage.scss';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('Sending Login request...');
            const response = await axios.post('http://localhost:3000/api/v1/user/login', {
                email,
                password,
            });

            // Store user information
            localStorage.setItem('Recruiter Name', JSON.stringify(response.data.name));
            const token = response.data.token;
            localStorage.setItem('token', token);

            toast.success(response.data.message);

            // Set user authentication status
            setIsAuthenticated({
                isAuthenticated: true,
                user: {
                    name: response.data.name,
                },
            });

            navigate('/');

        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
    };

    return (
        <div>
            <div className="parent-cont">
                <div className="login-div">
                    <h1>Already have an account?</h1>
                    <p>Your personal job finder is here</p>

                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className="btn">Sign in</button>
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

export default LoginPage;
