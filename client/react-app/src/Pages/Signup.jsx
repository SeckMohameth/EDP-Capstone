import React from 'react'
import { useState } from 'react';

function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPasswrod] = useState("")
    let [isManager, setIsManager] = useState(false)
    let [managerEmail, setManagerEmail] = useState("")
    
const handleCheckboxChange = (event) => {
    setIsManager(event.target.checked);
};

const handleSubmit = () => {
    //handle registration here
    console.log("user logged in")
}

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
    </div>
  )
}

export default Signup
