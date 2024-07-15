import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css"
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isManager, setIsManager] = useState(false);
    const [managerEmail, setManagerEmail] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleCheckboxChange = (event) => {
        setIsManager(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            password,
            isManager: !isManager, // Note: We're inverting this because the checkbox is for "I am an employee"
            managerEmail
        };
        
        try {
            const response = await fetch(`http://localhost:3000/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error posting new employee, status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
            console.log("user registered");
    
            // Log in the user
            await login(email, password);
    
            // Navigate based on user type
            if (isManager) {
                navigate("/employee"); // If they checked "I am an employee"
            } else {
                navigate("/manager"); // If they didn't check "I am an employee"
            }
        } catch(err){
            console.error(err);
            
        }
    };

    return (
        <div className="signup-page-container">
            <div className="signup-page-image-container"></div>
            <div className="signup-page-form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id='fullName'
                            placeholder='Enter your full name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="checkbox-group">
                        <label>
                            <input 
                                type="checkbox"
                                checked={isManager}
                                onChange={handleCheckboxChange}
                            />
                            I am a employee
                        </label>
                    </div>

                    {isManager && (
                        <div className="input-group">
                            <label htmlFor="managerEmail">Manager's Email</label>
                            <input
                                type='email'
                                id='managerEmail'
                                placeholder="Enter your manager's email"
                                value={managerEmail}
                                onChange={(e) => setManagerEmail(e.target.value)}
                            />
                        </div>
                    )}

                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/">Login here!</Link></p>
            </div>
        </div>
    );
}

export default Signup;