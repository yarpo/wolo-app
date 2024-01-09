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
import AdminUsersPage from "./Components/AdminHomePage/AdminUsersPage/AdminUsersPage";
import AdminCategoriesPage from "./Components/AdminHomePage/AdminCategoriesPage/AdminCategoriesPage";
import AdminRolesPage from "./Components/AdminHomePage/AdminRolesPage/AdminRolesPage";
import AdminDistrictsPage from "./Components/AdminHomePage/AdminDistrictsPage/AdminDistrictsPage";
import AdminEventsPage from "./Components/AdminHomePage/AdminEventsPage/AdminEventsPage";
import AdminOrganisationsPage from "./Components/AdminHomePage/AdminOrganisationsPage/AdminOrganisationsPage";

function App() {
  return (
    <>
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
            <Route path="/adminUsersPage" element={<AdminUsersPage />} />
            <Route path="/adminRolesPage" element={<AdminRolesPage />} />
            <Route path="/adminEventsPage" element={<AdminEventsPage />} />
            <Route path="/adminOrganisationsPage" element={<AdminOrganisationsPage />} />
            <Route path="/adminDistrictsPage" element={<AdminDistrictsPage />} />
            <Route path="/adminCategoriesPage" element={<AdminCategoriesPage />} />
            <Route path="/volunteerHomePage" element={<VolunteerHomePage />} />
            <Route path="/adminUsersPage" element={<AdminUsersPage />} />
            <Route path="/createEvent" element={<OrganiserCreateEvent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;
