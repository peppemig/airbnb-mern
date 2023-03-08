import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import BookingWidget from "../components/BookingWidget";

export default function SinglePlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState([])
    const [showAllPhotos,setShowAllPhotos] = useState(false)

    useEffect(() => {
        if (!id) {return}
        axios.get('/places/'+id).then(response => {
            console.log(response.data)
            setPlace(response.data)
        })
        
    }, [id])

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-2xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="bg-gray-200 right-12 top-8 flex p-2 rounded-xl fixed shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                    {place?.photos.length > 0 && place.photos.map(photo => (
                    <div>
                        <img className="flex aspect-square object-cover " src={'http://localhost:4000/uploads/'+photo} />
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <Link to={'/'} className="bg-gray-300 rounded-full float-right p-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </Link>
            <h1 className="text-3xl font-semibold">{place.title}</h1>
            <a target="_blank" className="flex my-2 gap-2 underline font-semibold pb-2" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} />
                        </div>
                    )}
                    </div>
                    <div className="grid">
                            {place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[1]} />
                            )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+place.photos[2]} />
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
            <div className="grid grid-cols-2 gap-10 mt-8">
                <div className=" text-black space-y-1">
                <h2 className="text-xl font-bold text-black">Description</h2>
                {place.description}
                    <h1 className="text-xl text-gray-400 font-bold pt-3">Check-in: {place.checkIn}</h1>
                    <h1 className="text-xl text-gray-400 font-bold">Check-out: {place.checkOut}</h1>
                    <h1 className="text-xl text-gray-400 font-semibold pb-3">Max number of guests: {place.maxGuests}</h1>
                </div>

                <BookingWidget place={place} />
            </div>

            <div className="bg-white -mx-8 p-8 my-8">
            <h2 className="text-md font-bold text-black">Extra info</h2>
                    <p className="text-sm">{place.extraInfo}</p>
            </div>
        </div>
    )
}