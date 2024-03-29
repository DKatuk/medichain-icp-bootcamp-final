import React, { useCallback, useEffect, useState } from 'react'
import Doctor from "./Doctor"
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "../ui/table"


function Doctors({ doctors, setDoctors }) {

  const getAllDoctorList = useCallback(async () => {
    try {
      const res = await final_project_backend.getAllDoctors().then(res => {
        console.log("doctossss res", res)
        setDoctors(res)
      })
      console.log("hey1")
    } catch (err) {
      console.log("hey2")
      console.log("Error fetching doctor records:", err)
    }
  }, []);

  useEffect(() => {
    getAllDoctorList()
  }, [getAllDoctorList])

  const tableHeaders = ["Doctor Name", "Doctor Speciality", "Delete Action", "Edit Action"]
  return (
    <div className="w-3/5 py-4 px-12 bg-blue-200 rouned-md shadow-md">
      <h2>Doctor List</h2>
      <Table className="w-full">
        <TableHeader>
          {tableHeaders.map((tableHead, index) => (<TableHead key={index}>
            {tableHead}
          </TableHead>))}
        </TableHeader>
        <TableBody>
          {doctors.length > 0 && doctors.map(doctor => (
            <Doctor key={doctor.id} doctor={doctor} doctors={doctors} setDoctors={setDoctors} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Doctors