import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';
import Details from './Components/Details/Details';
import Hero from './Components/Hero/Hero';
import Organiser from './Components/Organiser/Organiser.js';
import PageNotFound from './Components/PageNotFound/PageNotFound.js';
import Login from './Components/Login/Login.js';
import Signup from './Components/Signup/Signup.js';
import OrganiserHomePage from './Components/OrganiserHomePage/OrganiserHomePage.js';
import OrganiserCreateEvent from './Components/OrganiserCreateEvent/OrganiserCreateEvent.js';
import AdminHomePage from './Components/AdminHomePage/AdminHomePage.js';
import VolunteerHomePage from './Components/VolunteerHomePage/VolunteerHomePage.js';
import { FiltersProvider } from './Components/Filters/FiltersContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URLS } from './config.js';

import React, { useState, useEffect } from 'react';

function App() {
  const [role, setRole] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      fetch(URLS.USER, 
        { method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => setRole(data.roles))
        .catch(error => console.error('Error: No information about the user', error));
      }
  }, [token]);

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
            <Route path="/login" element={<Login />} />
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
