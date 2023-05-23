import { useTranslation } from 'react-i18next';
import './App.css';
import Navbar from './Components/Navbar/Navbar';


const languages = {
  en: {nativeName: 'English'},
  pl: {nativeName: 'Polish'},
  ua: {nativeName: 'Ukrainian'},
  ru: {nativeName: 'Russian'}
};

function App() {
  const {t, i18n} = useTranslation()
  return (
    <>
      <div className="App">
        <Navbar/>
        <header className="App-header">
          <div>
            {Object.keys(languages).map((l) =>(
              <button
              type="submit"
              key={l}
              onClick={() => i18n.changeLanguage(l)}
              disabled={i18n.resolvedLanguage ===l}>{languages[l].nativeName}</button>
            ))}
          </div>
          <p>
            WoloApp
          </p>
          <p>
            {t('hello')}
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
