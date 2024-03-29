import React, { useState } from 'react'
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from '../ui/button';
import { NOTIFY_TYPES, makeNotify } from '../makeNotify';
import { ToastContainer } from 'react-toastify';

function EditMajor({ major, majors, setMajors, isMajorGettingUpdated, setIsMajorGettingUpdated }) {

    const [newMajorName, setNewMajorName] = useState(major.name)

    console.log("editmajor-newMajorName:", newMajorName)

    const handleUpdateMajor = async (e) => {
        e.preventDefault();
        const newMajor = {
            id: major.id,
            name: newMajorName
        };
        try {
            const res = await final_project_backend.updateMajor(newMajor).then(() => {
                const updatedMajors = majors.map((item) => {
                    if (major.id == item.id) {
                        return { ...item, ...newMajor }
                    }
                    return item;
                })
                setMajors(updatedMajors);
                setIsMajorGettingUpdated(false)
                makeNotify(NOTIFY_TYPES.SUCCESS, 'Selected major updated successfully.');
            })
        } catch (err) {
            console.log("Error fetching major records:", err)
            setIsMajorGettingUpdated(false)
            makeNotify(NOTIFY_TYPES.ERROR, `Major could not be updated due to ${err}`);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => handleUpdateMajor(e)}>
                <input className="w-2/3" value={newMajorName} onChange={(e) => setNewMajorName(e.target.value)} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default EditMajor