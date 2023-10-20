import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';
import Details from './Components/Details/Details';
import Hero from './Components/Hero/Hero';
import { FiltersProvider } from './Components/Filters/FiltersContext';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <FiltersProvider>
          <Routes>
            <Route path="/" element={<Hero />}/>
            <Route path="/events" element={<AllEvents />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </FiltersProvider>
      </div>
    </>
  );
}

export default App;
