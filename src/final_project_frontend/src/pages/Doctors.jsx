import React from 'react'
import BreadCrumb from '../components/ReusableComps/BreadCrumb'
import { ToastContainer } from 'react-toastify'

function Doctors({ majors, setMajors }) {
    return (
        <div className="relative mt-20 h-[100vh] flex flex-col justify-start gap-4 items-center">
            <BreadCrumb route="/doctors" />
            <ToastContainer />
            Doctors
        </div>
    )
}

export default Doctors