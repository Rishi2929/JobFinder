import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, buttonText, className }) => {
    return (
        <div className={className}>
            <Link to={to} className="button">
                {buttonText}
            </Link>
        </div>
    );
}

export default Button;
