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

function Appointment({ appointment, appointments, setAppointments }) {
    return (
        <TableRow key={appointment.id}>
            <TableCell>
                <span>{appointment.patientName}</span></TableCell>
            <TableCell>
                <span>{appointment.doctor && appointment.doctor.name}</span></TableCell>
            <TableCell>
                <span>{appointment.doctor && appointment.doctor.major.name}</span></TableCell>
            <TableCell>
                <span>{appointment.date}</span></TableCell>
        </TableRow>
    )
}

export default Appointment