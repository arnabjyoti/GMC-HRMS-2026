import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>404 | page not found</h2>
            <button onClick={() => navigate('/')}>Go to Login Page</button>
        </div>
    )
}

export default NotFound