import React, { useCallback, useEffect, useState } from 'react'
import Major from './Major';
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "../ui/table"




function Majors({ majors, setMajors }) {

    const getAllMajorList = useCallback(async () => {
        try {
            const res = await final_project_backend.getAllMajors().then(res => setMajors(res))

        } catch (err) {
            console.log("Error fetching major records:", err)
        }
    }, []);

    useEffect(() => { getAllMajorList }, [getAllMajorList])

    const tableHeaders = ["Major Name", "Delete Action", "Edit Action"]
    return (
        <div className="w-3/5 py-4 px-12 bg-blue-200 rouned-md shadow-md">
            <h2>Major List</h2>
            <Table className="w-full">
                <TableHeader>
                    {tableHeaders.map((tableHead, index) => (<TableHead key={index}>
                        {tableHead}
                    </TableHead>))}
                </TableHeader>
                <TableBody>
                    {majors.length > 0 && majors.map(major => (
                        <Major key={major.id} majors={majors} setMajors={setMajors} major={major} />
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Majors