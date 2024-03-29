import React, { useEffect, useState } from 'react'
import { final_project_backend } from '../../../../declarations/final_project_backend/';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "/src/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "/src/components/ui/popover"
import { cn } from "/src/lib/utils"
import { Button } from "/src/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from '../ui/input'

function AddDoctor({ majors, setMajors, doctors, setDoctors }) {

  const [doctorInfo, setDoctorInfo] = useState({
    id: "",
    name: "",
    major: "",
    appointmentList: [] // could be set to real appointments list
  });

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

 
  const handleDoctorSubmit = async (e) => {

    e.preventDefault();
    const uniqueId = Math.round(Math.random() * 999999); // Generate a unique ID
    const doctorData = {
      id: uniqueId,
      name: doctorInfo.name,
      major: doctorInfo.major,
      appointmentList: doctorInfo.appointmentList
    };
    await final_project_backend.addDoctor(doctorData).then(res => {
      setDoctors([...doctors, ...res])
      setDoctorInfo({
        id: "",
        name: "",
        major: "",
        appointmentList: []
      });
    }).catch(err => {
      console.log("err in doctor submit:" + err);
    })
  };



  return (
    <div className="flex flex-col justify-center items-center w-3/5 bg-white shadow-md rounded-md py-12 px-12 text-center">
      <h2 className="font-bold text-lg">Register Doctor</h2>
      <form onSubmit={(e) => handleDoctorSubmit(e)} >
        <span className="flex flex-col gap-4 items-center">
          <Input className="w-full" value={doctorInfo.name} onChange={(e) => setDoctorInfo(prevState => ({
            ...prevState,
            name: e.target.value
          }))} placeholder="Type doctor name" />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {doctorInfo.major && majors.find((major) => major.name === doctorInfo.major.name) ? majors.find((major) => major.name === doctorInfo.major.name).name : "Select Speciality"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Select Speciality..." />
                <CommandEmpty>No Speciality Found</CommandEmpty>
                <CommandGroup>
                  {
                    majors.length > 0 && majors.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.name}
                        onSelect={() => {
                          setDoctorInfo(prevState => ({
                            ...prevState,
                            major: item
                          }))
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === item.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button type="submit" className="bg-blue-300">Register Doctor</Button>
        </span>
      </form>
    </div>
  )
}

export default AddDoctor