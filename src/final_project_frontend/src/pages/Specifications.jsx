import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import AddMajor from '../components/Major/AddMajor'
import Majors from '../components/Major/Majors'
import BreadCrumb from '../components/ReusableComps/BreadCrumb'
import { BsCaretRightFill } from "react-icons/bs";
import { Button } from '../components/ui/button'
import AddDoctor from '../components/Doctor/AddDoctor'
import Doctors from '../components/Doctor/Doctors'
import CreateAppointment from '../components/Appointment/CreateAppointment'
import Appointments from '../components/Appointment/Appointments'


function Specifications({ appointments, setAppointments, doctors, setDoctors, majors, setMajors }) {
    const [renderUI, setRenderUI] = useState("speciality")




    if (renderUI == "speciality") {
        return (
            <div className="relative mt-20 h-[100vh] flex flex-col justify-start gap-4 items-center" >
                <BreadCrumb route={`/${renderUI}`} />
                <ToastContainer />
                <AddMajor majors={majors} setMajors={setMajors} />
                {majors.length > 0 ? <Majors majors={majors} setMajors={setMajors} /> : (<div className="bg-blue-200 py-36 px-36 w-3/5 rounded-md shadow-lg text-sm text-slate-800 text-center">Created Specialities will be visible here</div>)}
                {majors.length > 0 && <Button onClick={() => setRenderUI("doctors")} className="flex gap-3 items-center bg-blue-600 text-white hover:bg-blue-700 hover:text-white text-md px-3 py-2 rounded-md">
                    <BsCaretRightFill className="text-white" /> Continue on Creating Doctors
                </Button>}

            </div>
        )
    } else if (renderUI == "doctors") {
        return (<div className="relative mt-20 h-[100vh] flex flex-col justify-start gap-4 items-center" >
            <BreadCrumb route={`/${renderUI}`} />
            <ToastContainer />
            <AddDoctor majors={majors} setMajors={setMajors} doctors={doctors} setDoctors={setDoctors} />

            <Button onClick={() => setRenderUI("appointments")} className="flex gap-3 items-center bg-blue-600 text-white hover:bg-blue-700 hover:text-white text-md px-3 py-2 rounded-md">
                <BsCaretRightFill onClick={() => setRenderUI("appointments")} className="text-white" /> Continue on Creating an Appointment
            </Button>
            <Doctors doctors={doctors} setDoctors={setDoctors} />

        </div>)

    } else if (renderUI == "appointments") {
        return (<div className="relative mt-20 h-[100vh] flex flex-col justify-start gap-4 items-center" >
            <BreadCrumb route={`/${renderUI}`} />
            <ToastContainer />
            <CreateAppointment appointments={appointments} setAppointments={setAppointments} majors={majors} setMajors={setMajors} doctors={doctors} setDoctors={setDoctors} />

            <Button onClick={() => setRenderUI("appointment")} className="flex gap-3 items-center bg-blue-600 text-white hover:bg-blue-700 hover:text-white text-md px-3 py-2 rounded-md">
                <BsCaretRightFill className="text-white" /> Continue on Creating an Appointment
            </Button>
            <Appointments appointments={appointments} setAppointments={setAppointments} />

        </div>)
    }

}

export default Specifications;