import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb"

function BreadCrumb({ route, dynamicRoute }) {
    const [staticPathName, setStaticPathName] = useState("")
    useEffect(() => {
        switch (route) {
            case "/get-appointment":
                setStaticPathName("Get An Appointment Page");
                break;
            case "/doctors":
                setStaticPathName("Doctors Page");
                break;
            case "/speciality":
                setStaticPathName("Speciality");
                break;
            case "/appointments":
                setStaticPathName("Appointments");
                break;
            default:
                setStaticPathName("404");
        };
    }, [route])


    if (route && dynamicRoute) {
        return (<Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href={route}>{staticPathName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{dynamicRoute}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>)
    } else if (route && !dynamicRoute) {
        return (
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{staticPathName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        )
    }

}

export default BreadCrumb