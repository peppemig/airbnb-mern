import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"

export default function SinglePlacePage(){
    const {id} = useParams();
    const [place,setPlace] = useState([])

    useEffect(() => {
        if (!id) {return}
        axios.get('/places/'+id).then(response => {
            setPlace(response.data)
        })
    }, [id])
    
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-2xl">{place.title}</h1>
            <h2>{place.address}</h2>
        </div>
    )
}