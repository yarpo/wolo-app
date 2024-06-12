
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
import TheyNeedYouEvents from './Views/TheyNeedYou/TheyNeedYou.js';
import Navbar from './Components/Navbar/Navbar';
import ReportPage from './Views/Reports/Reports.js';
import { FiltersProvider } from './Components/Filters/FiltersContext';
import fetchUser from './Utils/fetchUser.js';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ResetPassword from './Views/ResetPassword/ResetPassword.js';
import Settings from './Views/Settings/Settings.js';
import OrganiserSettings from './Views/OrganiserSettings/OrganiserSettings.js';
import ForVolunteers from './Views/ForVolunteers/ForVolunteers.js';
import ForgotPassword from './Views/ForgotPassword/ForgotPassword.js';
import MailForgotPassword from './Views/ForgotPassword/MailForgotPassword.js';
import CalendarView from './Views/Calendar/Calendar.js';
import CheckEmail from './Views/RegisterInfoViews/CheckEmail.js';

function App() {
  const [role, setRole] = useState(null);
  const [, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    fetchUser().then(data => {
      if (data) {
        setRole(data.roles);
      }
    })
  }, []);

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
            <Route path="/organisation" element={<Organiser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login  setToken={setToken} setUser={setUser}  />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/change-password" element={<ResetPassword />} />
            <Route path="/they-need-you" element={<TheyNeedYouEvents />} />
            <Route path="/for-volunteers" element={<ForVolunteers />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/forgot-password" element={<MailForgotPassword />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/registration-in-progress" element={<CheckEmail />} />
            {role && role.includes('MODERATOR') && <Route path="/reports" element={<ReportPage />} />}
            {role && role.includes('MODERATOR') && <Route path="/organisation-home-page" element={<OrganiserHomePage />} />}
            {role && role.includes('MODERATOR') && <Route path="/organisation-settings" element={<OrganiserSettings />} />}
            {role && role.includes('ADMIN') && <Route path="/admin-home-page" element={<AdminHomePage />} />}
            {role && role.includes('USER') && <Route path="/volunteer-home-page" element={<VolunteerHomePage />} />}
            {role && role.includes('MODERATOR') && <Route path="/create-event" element={<OrganiserCreateEvent />} />}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;