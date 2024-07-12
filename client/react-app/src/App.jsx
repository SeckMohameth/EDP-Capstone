import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeHome from "./Pages/EmployeeHome";
import ManagerHome from "./Pages/ManagerHome";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import RequireAuth from "./Components/RequireAuth";
import { AuthProvider } from "./hooks/AuthContext";

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={
            <RequireAuth>
              <EmployeeHome />
            </RequireAuth>
          } />
          <Route path="/manager" element={
            <RequireAuth>
              <ManagerHome />
            </RequireAuth>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
