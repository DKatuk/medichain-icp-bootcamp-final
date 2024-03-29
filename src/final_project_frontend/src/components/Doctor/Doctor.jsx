import React, { useState } from 'react'
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { NOTIFY_TYPES, makeNotify } from '../makeNotify';
import EditDoctor from "./EditDoctor"

function Doctor({ doctor, setDoctors, doctors }) {
  const [isDoctorGettingUpdated, setIsDoctorGettingUpdated] = useState(false);
  const [isDoctorLoading, setIsDoctorLoading] = useState(false);

  const handleDeleteDoctor = async (id) => {
    setIsDoctorLoading(true);
    try {
      await final_project_backend.deleteDoctor(id)
      const updatedDoctorList = doctors.filter(item => {
        return item.id !== id
      })
      setDoctors(updatedDoctorList);
      setIsDoctorLoading(false);
      makeNotify(NOTIFY_TYPES.SUCCESS, 'Selected doctor deleted successfully.');

    } catch {
      console("Error in delete doctor:", err)
      makeNotify(NOTIFY_TYPES.ERROR, 'Selected doctor could not be deleted due to ' + err);
    }
  }

  return (
    <TableRow key={doctor.id}>
      <TableCell>
        {isDoctorGettingUpdated ? (
          <EditDoctor doctor={doctor} doctors={doctors} setDoctors={setDoctors} isDoctorGettingUpdated={isDoctorGettingUpdated} setIsDoctorGettingUpdated={setIsDoctorGettingUpdated} />
        ) : (<span>{doctor.name}</span>)}</TableCell>
      <TableCell>
        <span>{doctor.major.name}</span>
      </TableCell>
      <TableCell>
        <Button onClick={() => handleDeleteDoctor(doctor.id)}>X Delete Doctor</Button>
      </TableCell>
      <TableCell>
        {isDoctorGettingUpdated ? (<Button onClick={() => setIsDoctorGettingUpdated(!isDoctorGettingUpdated)}>Cancel Editing</Button>) : (<Button onClick={() => setIsDoctorGettingUpdated(!isDoctorGettingUpdated)}>Edit Doctor</Button>)}
      </TableCell>
    </TableRow>
  )
}

export default Doctor