import React, { useState } from 'react'
import EditMajor from './EditMajor';
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

function Major({ major, majors, setMajors }) {
    const [isMajorGettingUpdated, setIsMajorGettingUpdated] = useState(false);

    const [isMajorLoading, setIsMajorLoading] = useState(false);
    const handleDeleteMajor = async (id) => {
        setIsMajorLoading(true);
        try {
            await final_project_backend.deleteMajor(id)
            const updatedMajorList = majors.filter(major => {
                return major.id !== id
            })
            setMajors(updatedMajorList);
            setIsMajorLoading(false);
            makeNotify(NOTIFY_TYPES.SUCCESS, 'Selected major deleted successfully.');
            // MAJOR DELETED NOTIFICATION
        } catch {
            console("Error in delete major:", err)
            // MAJOR COULDNOT DELETE NOTIFICATION
            makeNotify(NOTIFY_TYPES.ERROR, 'Selected major could not be deleted due to ' + err);
        }
    }
    return (
        <TableRow key={major.id}>
            <TableCell>
                {isMajorGettingUpdated ? (
                    <EditMajor major={major} majors={majors} setMajors={setMajors} isMajorGettingUpdated={isMajorGettingUpdated} setIsMajorGettingUpdated={setIsMajorGettingUpdated} />
                ) : (<span>{major.name}</span>)}</TableCell>
            <TableCell>
                <Button onClick={() => handleDeleteMajor(major.id)}>X Delete Major</Button>
            </TableCell>
            <TableCell>
                {isMajorGettingUpdated ? (<Button onClick={() => setIsMajorGettingUpdated(!isMajorGettingUpdated)}>Cancel Editing</Button>) : (<Button onClick={() => setIsMajorGettingUpdated(!isMajorGettingUpdated)}>Edit Major</Button>)}
            </TableCell>
        </TableRow>
    )
}

export default Major