import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";


export default function PlacesPage() {
    const [places,setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            console.log(data)
            setPlaces(data)
        })
    }, [])

    return (
        <>
            <AccountNav />
        <div className="flex items-center justify-center">
                <div>
                    <Link className='bg-primary text-white inline-flex gap-1 py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                        </svg> Add new accomodation
                    </Link>
                </div>
        </div>
        <div>
            
            {places.length > 0 && places.map(place => (
                <div className="mt-7 justify-center flex">
                <Link to={'/account/places/'+place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer lg:w-2/3">
                    <div className="w-32 h-32 grow shrink-0">
                        <img className="w-32 h-32 rounded-2xl object-cover" src={`http://localhost:4000/uploads/${place.photos[0]}`} />
                    </div>
                    <div className="grow-0 shrink">
                        <h2 className="text-2xl font-bold">{place.title}</h2>
                        <h1 className="text-l pb-2">{place.address}</h1>
                        <p>{place.description}</p>
                    </div>
                </Link>
                </div>
   



            ))}
        </div>
        </>
        
    )
}