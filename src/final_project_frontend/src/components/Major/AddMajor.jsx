import React, { useId, useState } from 'react';
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

function AddMajor({ majors, setMajors }) {
    const [majorName, setMajorName] = useState("")
    const handleMajorSubmit = async (e) => {
        e.preventDefault();
        await final_project_backend.addMajor({ id: Math.round(Math.random() * 999999), name: majorName }).then(res => {
            setMajors([...majors, ...res])
            setMajorName("");
        }).catch(err => {
            console.log("err in major submit:" + err);
        })
    };
    return (
        <div className="flex flex-col justify-center items-center w-3/5 bg-white shadow-md rounded-md py-12 px-12 text-center">
            <h2 className="font-bold text-lg">Enter Speciality</h2>
            <form onSubmit={(e) => handleMajorSubmit(e)} >
                <span className="flex gap-4 items-center">
                    <Input className="w-2/4" value={majorName} onChange={(e) => { setMajorName(e.target.value) }} placeholder="Type a major" />
                    <Button type="submit">Submit Speciality</Button></span>
            </form>
        </div>
    );
}

export default AddMajor
