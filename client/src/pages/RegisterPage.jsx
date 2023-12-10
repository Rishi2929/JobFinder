import React from 'react'
import './RegisterPage.scss'
import img from '../assets/img1.png'

function RegisterPage() {
    return (
        <div>
            <div className="parent-cont">
                <div className='left-div'>

                    <h1>Already have an account?</h1>
                    <p>Your personal job finder is here</p>

                    <form>
                        <input placeholder='Email' />
                        <input placeholder='Password' />
                        <button>Sign in</button>
                    </form>
                    <p>Don’t have an account?</p>

                </div>
                <div className='right-div'>
                    <img src={img} className='img1' alt='image' />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage