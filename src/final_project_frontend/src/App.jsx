import { final_project_backend } from 'declarations/final_project_backend';
import React, { useState, useEffect, useCallback } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import Specifications from './pages/Specifications';
import NavBar from './components/NavBar';
import Footer from './components/Footer';



function App() {
  const [majors, setMajors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([])
  console.log("app-doctors:", doctors)
  return (
    <div className="relative flex flex-col justify-between h-max bg-gradient-to-br  from-emerald-200 to-lime-50">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Specifications appointments={appointments} setAppointments={setAppointments} doctors={doctors} setDoctors={setDoctors} majors={majors} setMajors={setMajors} />} />

      </Routes>
      <Footer />
    </div>
  )

}

export default App;
