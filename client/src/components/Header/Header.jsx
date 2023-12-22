import React, { useContext } from 'react'
import './Header.scss'
import rect from '../../assets/Rectangle 4.png'
import rect2 from '../../assets/Rectangle 3.png'
import rect3 from '../../assets/Rectangle 2.png'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Context } from '../../main'
import toast from 'react-hot-toast';


function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)
    const recruiterName = JSON.parse(localStorage.getItem('Recruiter Name'));



    const logoutHandler = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('Recruiter Name'); // Remove user information

            setIsAuthenticated(false);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
    };



    return (
        <div className='header'>

            <div className="flex-cont">
                <div className="img1cont">
                    <img src={rect3}></img>

                </div>
                <h1>Jobfinder</h1>
                <div className="img2cont">
                    <img src={rect2}></img>

                </div>
                <div className='img-cont'>
                    <img src={rect}>

                    </img>

                    <div className='dialog-box'> {isAuthenticated ?
                        <div className="flex-btn">
                            <button className='logout-btn' onClick={logoutHandler}>Logout</button>
                            <p className='name'>Hello! {recruiterName}</p>
                        </div>
                        :
                        <div className="flex-btn">
                            <Link to="/login" className='btn-1'>Login</Link>
                            <Link to="/register" className='btn-2'>Register</Link>
                        </div>
                    }</div>
                </div>


            </div>
        </div>
    )
}

export default Header