import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";

export default function PlacesFormPage(){
    const {id} = useParams()
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [redirect,setRedirect] = useState(false)

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

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests}
        // IF WE HAVE ID IN LINK THEN WE ARE UPDATING
        if(id){
            await axios.put('/places', {id,...placeData})
            setRedirect(true)
        }else{
        // IF WE DONT HAVE ID IN LINK WE HAVE NEW PLACE
            await axios.post('/places', placeData)
            setRedirect(true)
        }
    }

    useEffect(() => {
        if(!id) {return}
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
        })
    }, [id])

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return(
        <>
        <AccountNav />
        <div className="flex justify-center">


        <div className="sm:w-full md:w-2/3 lg:w-1/2">


                    <form className="space-y-10" onSubmit={savePlace}>

                        <div>
                        {preInput('Title','Title for your place, should be short and catchy')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely apt"/>
                        </div>

                        <div>
                        {preInput('Address','Address to this place')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />
                        </div>

                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
                </div>
                </>
    )
}