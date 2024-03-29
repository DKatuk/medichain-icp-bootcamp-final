import { useState } from 'react';
import Calendar from 'react-calendar';
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
import { Input } from '../ui/input';
import { final_project_backend } from '../../../../declarations/final_project_backend/';

function CreateAppointment({ majors, setMajors, doctors, setDoctors, appointments, setAppointments }) {

    const [open, setOpen] = useState(false)
    const [openHour, setOpenHour] = useState(false)
    const hoursList = ["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]
    const [value, setValue] = useState("")
    const [dateValue, setDateValue] = useState(new Date())

    const [appointment, setAppointment] = useState({
        patientName: "",
        doctor: "",
        date: dateValue,
        hour: ""
    })

    console.log("appointment", appointment)

    const handleAppointmentSubmit = async (e) => {
        e.preventDefault();
        const uniquePatientId = Math.round(Math.random() * 999999);
        const uniqueAppointmentId = Math.round(Math.random() * 7777777);
        const newAppointmentObject = {
            patientId: uniquePatientId,
            id: uniqueAppointmentId,
            patientName: appointment.patientName,
            doctor: appointment.doctor,
            date: dateValue.toLocaleDateString("tr-TR") + "-"+ appointment.hour
        }
        await final_project_backend.addAppointment(newAppointmentObject).then(res => {
            setAppointments([...appointments, ...res])
            setAppointment({
                patientName: "",
                doctor: "",
                date: new Date()

            });
        }).catch(err => {
            console.log("err in major submit:" + err);
        })
    };



    return (
   
            <div className="flex flex-col justify-center items-center w-3/5 bg-white shadow-md rounded-md py-12 px-12 text-center h-max">

                <h2 className="font-bold text-lg">Create an Appointment</h2>

                <div className="w-full flex justify-center items-center">
                    <Calendar className="scale-50" onChange={setDateValue} value={dateValue} />
                </div>

                <form onSubmit={(e) => handleAppointmentSubmit(e)} >
                    <span className="flex flex-col gap-4 items-center">
                        <Input className="w-full" value={appointment.patientName} onChange={(e) => { setAppointment(prev => ({ ...prev, patientName: e.target.value })) }} placeholder="Type patient name" />


                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {appointment.doctor.name && doctors.find((doctor) => doctor.name === appointment.doctor.name) ? doctors.find((doctor) => doctor.name === appointment.doctor.name).name : "Select Doctor"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Select Doctor..." />
                                    <CommandEmpty>No Doctor Found</CommandEmpty>
                                    <CommandGroup>
                                        {
                                            doctors.length > 0 && doctors.map((item) => (
                                                <CommandItem
                                                    key={item.id}
                                                    value={item.name}
                                                    onSelect={() => {
                                                        setAppointment(prevState => ({
                                                            ...prevState,
                                                            doctor: item
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

                        <Popover open={openHour} onOpenChange={setOpenHour}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openHour}
                                    className="w-[200px] justify-between"
                                >
                                    {appointment.hour && hoursList.find((hour) => hour === appointment.hour) ? hoursList.find((hour) => appointment.hour === hour) : "Select Hour"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Select an Hour..." />
                                    <CommandEmpty>No Hour Found</CommandEmpty>
                                    <CommandGroup>
                                        {
                                            hoursList.map((hour) => (
                                                <CommandItem
                                                    key={hour}
                                                    value={hour}
                                                    onSelect={() => {
                                                        setAppointment(prevState => ({
                                                            ...prevState,
                                                            hour: hour
                                                        }))
                                                        setOpenHour(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === hour ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {hour}
                                                </CommandItem>
                                            ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <Button type="submit">Register an Appointment</Button></span>
                </form>


            </div>
    )
}

export default CreateAppointment