import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context, server } from '../../main';
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
            const response = await axios.post(`${server}/api/v1/user/login`, {
                email,
                password,
            });
            console.log("User", response.data.name)
            localStorage.setItem('Recruiter Name', JSON.stringify(response.data.name)); // Store user information


            const token = response.data.token;
            localStorage.setItem('token', token);


            toast.success(response.data.message);
            setIsAuthenticated(true);


            setIsAuthenticated({
                isAuthenticated: true,
                user: {
                    name: response.data.name,
                }
            });
            navigate('/')


        } catch (error) {
            // console.log("first login failed")
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

                    <div className="dialog-login">
                        <p>Don’t have an account?</p>
                        <Link to="/register" className="sign-up-link">Sign Up</Link>
                    </div>
                </div>

                <div className="right-div">
                    <img src={img} className="img1" alt="image" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
