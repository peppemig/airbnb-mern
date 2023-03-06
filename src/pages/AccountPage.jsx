import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"
import PlacesPage from "./PlacesPage"
import AccountNav from "../components/AccountNav"

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null)
    const {ready,user,setUser} = useContext(UserContext)

    // LOGOUT FUNC
    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    // I GET SUBPAGE FROM APP.JSX IN LINK PARAMS
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    // READY FROM USER CONTEXT
    if (!ready) {
        return 'Loading...'
    }

    // THERE'S NO USER AND NO REDIRECT GO TO /LOGIN
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    // REDIRECT WILL HAPPEN AFTER LOGOUT
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <>
        <AccountNav />
        <div className="text-center justify-center">
            <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        </div>
        </>
    )
}