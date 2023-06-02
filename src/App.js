import { useTranslation } from 'react-i18next';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import AllEvents from './Components/AllEvents/AllEvents';

function App() {
  const {t, i18n} = useTranslation()
  return (
    <>
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <p>
            WoloApp
          </p>
          <p>
            {t('hello')}
          </p>
        </header>
        <AllEvents />
      </div>
    </>
  );
}

export default App;
