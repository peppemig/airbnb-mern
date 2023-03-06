import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";


export default function PlacesPage() {
    // I GET PARAM FROM LINK (SEE APP.JSX)
    const {action} = useParams();

    return (
        <div>
            <AccountNav />
        <div className="flex justify-center">
                <div className="text-center">
                    <Link className='bg-primary text-white inline-flex gap-1 py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                        </svg> Add new accomodation
                    </Link>
                </div>
        </div>
        </div>
    )
}