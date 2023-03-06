import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos,onChange}) {

    const [photoLink,setPhotoLink] = useState('');

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
        onChange(prev => {
            return [...prev, (data.filename)]
        })
        //console.log(addedPhotos)
        setPhotoLink('');
    }

    function uploadPhoto (ev) {
        ev.preventDefault()
        const files = ev.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos',files[i])
        }
        axios.post('/upload', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
            const {data} = response;
            console.log(data)
            for (let i=0;i<data.length;i++) {
                onChange(prev => {
                    return [...prev, data[i]]
                })
            }
        })
    }


    return (
        <>
        <div>
        {preInput('Photos','Add some photos of your place')}
        {/* ADD PHOTO BY LINK */}
        <div className="flex">
            <input value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder="Add using a link..." />
            <button onClick={addPhotoByLink} className="mx-5 w-20 rounded-xl">Add photo</button>
        </div>
        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        { addedPhotos.length > 0 && addedPhotos.map(link => (
            <div className="h-32 flex" key={link}>
            <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+link} />
            </div>
        ))}
        {/* UPLOAD PHOTO FROM PC */}
            <label className="h-32 border flex justify-center items-center bg-transparent rounded-2xl p-8 text-2xl cursor-pointer text-gray-500">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                Upload
            </label>
        </div>
        </div>
        </>
    )
}