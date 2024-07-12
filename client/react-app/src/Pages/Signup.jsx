import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPasswrod] = useState("");
    let [isManager, setIsManager] = useState(false);
    let [managerEmail, setManagerEmail] = useState("");
    
const handleCheckboxChange = (event) => {
    setIsManager(event.target.checked);
};

const handleSubmit = async (e) => {
  e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      isManager: isManager,
      managerEmail: managerEmail
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
      console.log("user logged in");
    } catch(err){
      console.error(err);
    }
};

  return (
    <div>
      <h1>Registration</h1>
        <form onSubmit={handleSubmit}>
            <label>Full Name</label><br/>
            <input
            type="text"
            id='fullName'
            placeholder='Enter your fullname'
            value={name}
            onChange={(e => setName(e.target.value))}
            /><br/>

            <label>Email</label><br/>
            <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e => setEmail(e.target.value))}
            /><br/>

            <label>Password</label><br/>
            <input
            type='password'
            id='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e => setPasswrod(e.target.value))}
            /><br/>


            <h3>Account Type</h3><br/>
            <p>Are you a employye?</p>
            <input 
            type="checkbox"
            checked={isManager}
            onChange={handleCheckboxChange}
            value={isManager}
            /><br/>
            { isManager && (
                <>
                 <label>Please enter your manager's email</label><br/>
                <input
                    type='email'
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                />
                </>
            )}

          
            <input type="submit"/>

        </form>
        <p>Already have an account? <Link to="/">Login!</Link></p>
    </div>
  );
}

export default Signup;
