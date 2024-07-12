import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import Signup from './Signup';

function Login() {
  
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //handle login here
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <h1>Login here</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label><br/>
        <input 
        type="email" 
        id="email" 
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Please enter your email'
        /><br/>

      <label>Password</label><br/>
      <input 
      type='password'
      id="password"
      name='password'
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder='enter password'
      /><br/>

      <input type="submit" id="submit"/>   
      </form>

      <p>Don't have an account? Signup <Link to="signup">here!</Link></p>
    </div>
  );
}

export default Login;
