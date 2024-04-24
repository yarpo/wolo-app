
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AllEvents from './Views/AllEvents/AllEvents.js';
import Details from './Views/Details/Details';
import Hero from './Views/Hero/Hero';
import Organiser from './Views/Organiser/Organiser.js';
import PageNotFound from './Views/PageNotFound/PageNotFound.js';
import Login from './Views/Login/Login.js';
import Signup from './Views/Signup/Signup.js';
import OrganiserHomePage from './Views/OrganiserHomePage/OrganiserHomePage.js';
import OrganiserCreateEvent from './Views/OrganiserCreateEvent/OrganiserCreateEvent.js';
import AdminHomePage from './Views/AdminHomePage/AdminHomePage.js';
import VolunteerHomePage from './Views/VolunteerHomePage/VolunteerHomePage.js';
import Navbar from './Components/Navbar/Navbar';
import { FiltersProvider } from './Components/Filters/FiltersContext';
import fetchUserRoles from './Utils/fetchUserRoles.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUserRoles()
        .then(roles => setRole(roles))
        .catch(error => console.error('Error: No information about the user', error));
    }
  }, [token, user]);

  return (
    <>
      <ToastContainer />
      <div className="App">
        <Navbar />
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/organiser" element={<Organiser />} />
            <Route path="/login" element={<Login  setToken={setToken} setUser={setUser}  />} />
            <Route path="/signup" element={<Signup />} />
            {role && role.includes('MODERATOR') && <Route path="/organiserHomePage" element={<OrganiserHomePage />} />}
            {role && role.includes('ADMIN') && <Route path="/adminHomePage" element={<AdminHomePage />} />}
            {role && role.includes('USER') && <Route path="/volunteerHomePage" element={<VolunteerHomePage />} />}
            {role && role.includes('MODERATOR') && <Route path="/createEvent" element={<OrganiserCreateEvent />} />}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;