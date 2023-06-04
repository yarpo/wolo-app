import { useTranslation } from 'react-i18next';
import { Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';

function App() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/events" element={<AllEvents />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
