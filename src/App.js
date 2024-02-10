import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';
import Details from './Components/Details/Details';
import Hero from './Components/Hero/Hero';
import Organizer from './Components/Organizer/Organizer.js';
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

function App() {
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
            <Route path="/organizer" element={<Organizer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/organiserHomePage" element={<OrganiserHomePage />} />
            <Route path="/adminHomePage" element={<AdminHomePage />} />
            <Route path="/volunteerHomePage" element={<VolunteerHomePage />} />
            <Route path="/createEvent" element={<OrganiserCreateEvent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;
