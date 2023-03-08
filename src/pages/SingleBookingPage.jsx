import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import format from "date-fns/format";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export default function SingleBookingPage() {
    const {id} = useParams();
    const [booking,setBooking] = useState('')
    const [showAllPhotos,setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (booking === ''){
        return '';
    }

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-2xl">Photos of {booking.place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="bg-gray-200 right-12 top-8 flex p-2 rounded-xl fixed shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {booking.place?.photos.length > 0 && booking.place.photos.map(photo => (
                    <div>
                        <img className="flex aspect-square object-cover " src={'http://localhost:4000/uploads/'+photo} />
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <Link to={'/account/bookings'} className="bg-gray-300 rounded-full float-right p-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </Link>
            <h1 className="text-3xl font-semibold">{booking.place.title}</h1>
            <a target="_blank" className="flex my-2 gap-2 underline font-semibold pb-2" href={'https://maps.google.com/?q='+booking.place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {booking.place.address}
            </a>

            <div className="bg-gray-300 rounded-md w-full mb-4 p-4 flex justify-between">
                {/* LEFT COL */}
                <div>
                    <h1 className="text-xl font-semibold">Your booking informations:</h1>
                    <div className="flex gap-2 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <h1>Check-in: <b>{format(new Date(booking.checkIn), 'dd-MM-yyyy')}</b> | Check-out: <b>{format(new Date(booking.checkOut), 'dd-MM-yyyy')}</b></h1>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        <h1>Number of guests: <b>{booking.numberOfGuests}</b></h1>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                        <h1>Number of nights: <b>{differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}</b></h1>
                    </div>
                </div>

                {/* RIGHT COL */}
                <div className="items-center justify-center flex">
                    <div className="gap-2 p-5 bg-primary text-white text-2xl rounded-lg">


                            <h1>Total price: </h1>
                            <h1>
                                <b className="text-3xl">€{booking.price}</b>
                            </h1>

                    </div>
                </div>

            </div>



            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                    {booking.place.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/"+booking.place.photos[0]} />
                        </div>
                    )}
                    </div>
                    <div className="grid">
                            {booking.place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/"+booking.place.photos[1]} />
                            )}
                        <div className="overflow-hidden">
                            {booking.place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+booking.place.photos[2]} />
                            )}
                        </div>
                    </div>     
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    show more photos
                </button>
            </div>
        </div>
    )
}