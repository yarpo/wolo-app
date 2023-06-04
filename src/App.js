import { useTranslation } from 'react-i18next';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Details from './Components/Details/Details';
import Hero from './Components/Hero/Hero';

function App() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="App">
        <Navbar />
        <Hero />
        {/* <Details /> */}
      </div>
    </>
  );
}

export default App;
