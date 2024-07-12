import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeHome from "./Pages/EmployeeHome";
import ManagerHome from "./Pages/ManagerHome";
import Login from "./Pages/Login";
import Signup from './Pages/Signup';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/employee" element={<EmployeeHome/>}/>
        <Route path='/manager' element={<ManagerHome/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
