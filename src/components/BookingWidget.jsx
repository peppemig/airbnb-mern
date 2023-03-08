import { useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from "react-router-dom"


export default function BookingWidget({place}) {
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [numberOfGuests,setNumberOfGuests] = useState(1)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState(0)
    const [redirect,setRedirect] = useState('')

    let numberOfDays = 0;

    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }

    async function bookThisPlace() {
        const data = {checkIn,checkOut,phone,name,email,
            place:place._id,price:numberOfDays*place.price,numberOfGuests}
        const response = await axios.post('/bookings', data)
        const bookingId = response.data._id
        setRedirect('/account/bookings/'+bookingId)
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
        <div className="bg-white shadow-lg p-4 rounded-2xl text-center flex flex-col items-center">
            <b className="text-2xl pb-4">Price: €{place.price} /per night</b>
            <div className="border-2 rounded-lg p-4">
                <div className="w-full border-b-2 pb-2">
                    <label className="pr-5 text-gray-500 text-lg">Check-in</label>
                    <input type="date" className="p-2" 
                    value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className="w-full pt-2">
                    <label className="pr-5 text-gray-500 text-lg">Check-out</label>
                    <input type="date" className="p-2" 
                    value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                </div>
            </div>
            <div className="pt-2 pb-4 w-1/2">
                <label className="font-semibold text-xl">Number of guests</label>
                <input type="number" 
                value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
            </div>

            {numberOfDays > 0 && (
                <div className="pt-4 text-center border-t-2">
                <span className="pt-3 font-bold text-xl">Total: €{place.price * numberOfDays}</span><br/>
                <label className="flex-inline items-center gap-3 text-md font-semibold"> Full name
                <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                </label>
                <label className="flex-inline items-center gap-3 text-md font-semibold"> Email
                <input type="text" value={email} onChange={ev => setEmail(ev.target.value)}/>
                </label>
                <label className="flex-inline items-center gap-3 text-md font-semibold"> Phone number
                <input type="number" value={phone} onChange={ev => setPhone(ev.target.value)}/>
                </label>
                </div>

            )}

            <button onClick={bookThisPlace} className="flex bg-primary p-3 rounded-xl w-1/2 mt-2 justify-center text-white font-bold text-xl">
                Book it now!
            </button>
        </div>
    </div>
    )
}