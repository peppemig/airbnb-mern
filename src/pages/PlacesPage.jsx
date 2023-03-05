import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
    // I GET PARAM FROM LINK (SEE APP.JSX)
    const {action} = useParams();

    return (
        <div>
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
                <div className="items-center justify-center flex w-full">
                    <form>

                        <h2 className="text-2xl font-bold mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your place, should be short and catchy</p>
                        <input type="text" placeholder="title, for example: My lovely apt"/>

                        <h2 className="text-2xl font-bold mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Address to this place</p>
                        <input type="text" placeholder="address" />

                        <h2 className="text-2xl font-bold mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">Add some photos of your place</p>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500">+</button>
                        </div>

                    </form>
                </div>
            )}
        </div>
    )
}