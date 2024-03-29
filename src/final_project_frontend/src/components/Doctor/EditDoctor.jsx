import React from 'react'
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import { useState } from 'react';
import { Button } from '../ui/button';
import { NOTIFY_TYPES, makeNotify } from '../makeNotify';

function EditDoctor({ doctor, doctors, setDoctors, isDoctorGettingUpdated, setIsDoctorGettingUpdated }) {
  const [newDoctor, setNewDoctor] = useState(
    {
      id: doctor.id,
      name: doctor.name,
      major: doctor.major,
      appointmentList: doctor.appointmentList
    }
  )

  console.log("editddoctor:", newDoctor)

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    const newDoctorObect = {
      id: doctor.id,
      name: newDoctor.name,
      major: newDoctor.major,
      appointmentList: doctor.appointmentList
    };
    try {
      const res = await final_project_backend.updateDoctor(newDoctorObect).then(() => {
        const updatedDoctors = doctors.map((item) => {
          if (doctor.id == item.id) {
            return { ...item, ...newDoctorObect }
          }
          return item;
        })
        setDoctors(updatedDoctors);
        setIsDoctorGettingUpdated(false)
        makeNotify(NOTIFY_TYPES.SUCCESS, 'Selected doctor updated successfully.');
      })
    } catch (err) {
      console.log("Error updating doctor:", err)
      setIsDoctorGettingUpdated(false)
      makeNotify(NOTIFY_TYPES.ERROR, `Doctor could not be updated due to ${err}`);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleUpdateDoctor(e)}>
        <input className="w-2/3" value={newDoctor.name} onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))} />
        <Button type="submit">Submit</Button> 
      </form>
    </div>
  )
}

export default EditDoctor