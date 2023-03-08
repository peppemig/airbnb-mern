import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";


export default function BookingsPage() {
    const [bookings,setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    },[])

    return(
        <>
        <AccountNav />
        <div>
            {bookings.length > 0 && bookings.map(booking => (
                <div className="mt-7 justify-center flex">
                <Link to={'/account/bookings/'+booking._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer lg:w-2/3">
                    <div className="w-32 h-32 grow shrink-0">
                        <img className="w-32 h-32 rounded-2xl object-cover" src={`http://localhost:4000/uploads/${booking.place.photos[0]}`} />
                    </div>
                    <div className="grow-0 shrink">
                        <h2 className="text-2xl font-bold">{booking.place.title}</h2>
                        <h1 className="text-l pb-2">{booking.place.address}</h1>

                        <p className="flex gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            Check-in: <b>{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</b>
                            |
                            Check-out: <b>{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</b>
                        </p>

                        <p className="flex gap-2 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                            Total price: <b>€{booking.price}</b>
                        </p>

                        <p className="border-t-2">{booking.place.description}</p>
                    </div>
                </Link>
                </div>
            ))}
        </div>
        </>
    )
}