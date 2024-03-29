import React, { useCallback, useEffect, useState } from 'react'
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "../ui/table"
import Appointment from './Appointment';

function Appointments({ appointments, setAppointments }) {



    console.log("appointments", appointments)
    const getAllAppointmentList = useCallback(async () => {
        try {
            const res = await final_project_backend.getAllAppointments().then(res => setAppointments(res))

        } catch (err) {
            console.log("Error fetching major records:", err)
        }
    }, []);

    useEffect(() => { getAllAppointmentList }, [getAllAppointmentList])

    const tableHeaders = ["Patient Name", "Doctor Name", "Doctor Speciality", "Date"]

    return (
        <div>
            <h2>Appointment List</h2>
            <Table className="w-full">
                <TableHeader>
                    {tableHeaders.map((tableHead, index) => (<TableHead key={index}>
                        {tableHead}
                    </TableHead>))}
                </TableHeader>
                <TableBody>
                    {appointments.length > 0 && appointments.map(appointment => (
                        <Appointment key={appointment.id} appointments={appointments} setAppointments={setAppointments} appointment={appointment} />
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default Appointments