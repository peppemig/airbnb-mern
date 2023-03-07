import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import AccountPage from './pages/AccountPage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacesPage from './pages/PlacesPage'
import RegisterPage from './pages/RegisterPage'
import BookingsPage from './pages/BookingsPage'
import { UserContextProvider } from './UserContext'
import SinglePlacePage from './pages/SinglePlacePage'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true;


function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/place/:id" element={<SinglePlacePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
