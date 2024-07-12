import React from 'react'
import { useState } from 'react';

function Signup() {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPasswrod] = useState("")
    let [accountType, setAccountType] = useState("")

  return (
    <div>
      <h1>Registration</h1>
        <form>
            <label>Full Name</label><br/>
            <input
            type="text"
            id='fullName'
            placeholder='Enter your fullname'
            value={name}
            onChange={(e => setName(e.target.value))}
            /><br/>

            <label>Email</label>
            <input
            type='email'
            id='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e => setEmail(e.target.value))}
            /><br/>

            {/* <label>Account Type</label>
            <input 
            type="radio"
            value={}
            /> */}

        </form>
    </div>
  )
}

export default Signup
