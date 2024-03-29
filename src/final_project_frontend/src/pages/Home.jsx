import React from 'react'
import { Button } from '../components/ui/button'

function Home({ majors, setMajors }) {
    return (
        <div className="container px-24 h-max w-full ">
            <section className="my-6 rounded-md shadow-md bg-white text-slate-900 flex justify-between">
                <div className="flex flex-col justify-center items-center gap-3 px-20 text-start">
                    <h1 className="font-semibold text-lg">MediChain</h1>
                    <h2 className="text-md">Decentralized Hospital Management System</h2>
                    <a href="/explore" className=" bg-blue-600 text-white hover:bg-blue-700 hover:text-white text-md px-3 py-2 rounded-md">Explore</a>
                </div>

                <div className="relative h-[60vh] w-[50%] bg-cover bg-center overflow-hidden rounded-r-md" style={{
                    backgroundImage: "url('/hospital.png')"
                }}>
                </div>

            </section>

            <div className="my-4 px-32">
                <p className="text-center text-sm">MediChain provides decentralized and secure hospital management system where patients can easily schedule appointments with doctors across various specialties,and will be leveraging blockchain technology for authentication and data </p>
            </div>

            <div className="flex flex-col rounded-md shadow-md bg-gradient-to-r from-blue-300 to-blue-200 justify-center py-6 px-12 gap-3">
                <h3 className="text-semibold text-center w-full border-b pb-3 border-b-slate-700">Features</h3>
                <div className="grid grid-cols-3 gap-4 justify-start items-center h-max">
                    <div>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <span className="rounded-full p-3 bg-lime-50"> Step 1</span>

                            <span className="font-semibold text-sm">Specialities & Majors</span>
                        </div>
                        <p className="text-base">Create a speciality. You can edit or delete created specialities</p>

                    </div>

                    <div>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <span className="rounded-full p-3 bg-lime-50"> Step 2</span>

                            <span className="font-semibold text-sm">Doctors</span>
                        </div>
                        <p className="text-base">Create doctors under corresponding specialities. List doctors and edit or delete</p>
                    </div>

                    <div>
                        <div className="flex flex-col gap-2 justify-start items-start">
                            <span className="rounded-full p-3 bg-lime-50"> Step 3</span>

                            <span className="font-semibold text-sm">Appointments</span>
                        </div>
                        <p className="text-base">Create an appointment by selecting speciality and doctor and appointment date.</p>
                    </div>


                </div>
            </div>

            <div className="flex flex-col items-center justify-start gap-4 mt-12 ">
                <h3 className="font-semibold">Prospects & Improvements</h3>
                <div className=" grid grid-cols-3 gap-6">
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md" >Implement Authentication with Web3</h4>
                        Integrate Web3 authentication to allow users to securely log in using their blockchain wallet addresses. This adds an extra layer of security and decentralization to your application.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Smart Contracts for Appointment Booking:</h4>
                        Develop smart contracts on a blockchain network to manage appointment bookings. This ensures transparency, immutability, and trust in the appointment scheduling process.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Enhanced Privacy with Blockchain:</h4>
                        Utilize blockchain's cryptographic features to ensure patient data privacy and security. Implement techniques such as encryption and permissioned access to sensitive information.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Integration with Hospital Information Systems (HIS):</h4>
                        Integrate your system with existing Hospital Information Systems to streamline data sharing and provide a seamless experience for both healthcare providers and patients.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Patient Feedback and Ratings: </h4>
                        Allow patients to provide feedback and ratings for their appointments. Smart contracts can handle the validation and storage of this feedback, providing valuable insights for both patients and healthcare providers.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Integration with Healthcare Providers' Wallets</h4>
                        Enable seamless payment processing using cryptocurrencies directly from patients' blockchain wallets. This simplifies the billing process and reduces transaction costs associated with traditional payment methods.
                    </p>
                    <p className="py-12 px-16 bg-white rounded-md shadow-lg text-sm">
                        <h4 className="font-bold text-md">Real-time Appointment Notifications:</h4>
                        Implement real-time notifications for appointment reminders, updates, and cancellations using blockchain-based messaging protocols. This ensures timely communication between patients and healthcare providers.
                    </p></div>
            </div>


        </div>
    )
}

export default Home