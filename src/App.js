import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';
import Details from './Components/Details/Details';

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
