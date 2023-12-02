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
import { FiltersProvider } from './Components/Filters/FiltersContext';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/details" element={<Details />} />
            <Route path="/organizer" element={<Organizer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/organiser" element={<OrganiserHomePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;
