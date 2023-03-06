import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";

export default function PlacesPage() {
    // I GET PARAM FROM LINK (SEE APP.JSX)
    const {action} = useParams();
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [photoLink,setPhotoLink] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl font-bold mt-4">{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault()
        const {data} = await axios.post('/upload-by-link', {link: photoLink})
        //console.log(data.filename)
        setAddedPhotos(prev => {
            return [...prev, (data.filename)]
        })
        console.log(addedPhotos)
        setPhotoLink('');
    }

    return (
        <div className="flex justify-center">
            {/* IF ACTION IS NOT NEW */}
            {action !== 'new' && (
                <div className="text-center">
                    <Link className='bg-primary text-white inline-flex gap-1 py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /> 
                        </svg> Add new accomodation
                    </Link>
                </div>
            )}
            
            {/* IF ACTION IS NEW */}
            {action === 'new' && (
                <div className="sm:w-full md:w-2/3 lg:w-1/2">
                    <form className="space-y-10">

                        <div>
                        {preInput('Title','Title for your place, should be short and catchy')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely apt"/>
                        </div>

                        <div>
                        {preInput('Address','Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        </div>

                        <div>
                        {preInput('Photos','Add some photos of your place')}
                        <div className="flex">
                            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder="Add using a link..." />
                            <button onClick={addPhotoByLink} className="mx-5 w-20 rounded-xl">Add photo</button>
                        </div>

                        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        { addedPhotos.length > 0 && addedPhotos.map(link => (
                            <div>
                            <img className="rounded-2xl" src={'http://localhost:4000/uploads/'+link} />
                            </div>
                        ))}
                            <button className="border flex justify-center items-center bg-transparent rounded-2xl p-8 text-2xl text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        </div>

                        <div>
                        {preInput('Description','Description of this place')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="flex" />
                        </div>

                        <Perks selected={perks} onChange={setPerks} />

                        <div>
                        {preInput('Extra info','House rules, etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        </div>

                        <div>
                        {preInput('Check-in & Check-out','Add check-in and check-out times')}
                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <h3 className="mt-3 -mb-1">Check-in time</h3>
                                <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder="for example: 14:00"/>
                            </div>
                            <div>
                                <h3 className="mt-3 -mb-1">Check-out time</h3>
                                <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder="for example: 10:00"/>
                            </div>
                            <div>
                                <h3 className="mt-3 -mb-1">Max number of guests</h3>
                                <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="for example: 2"/>
                            </div>
                        </div>
                        </div>

                        <div> 
                        <div className="items-center justify-center flex">
                            <button className="primary my-4 w-64">Save</button>
                        </div>
                        </div>



                    </form>
                </div>
            )}
        </div>
    )
}