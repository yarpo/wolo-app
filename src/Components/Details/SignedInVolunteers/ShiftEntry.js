import { useTranslation } from 'react-i18next';
import { useState} from 'react';
import '../../../styles/shift-entry.scss';
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";
import VolunteerEntry from './VolunteerEntry';

const ShiftEntry = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleToggle();
        }
    };

    return (
        <div className='shift_entry'>
            <button className='shift_entry_toggle' onClick={handleToggle} onKeyDown={handleKeyDown}>
                {isOpen ? (
                    <>
                        <VscChevronDown id="shift_entry_icon"/> 
                    </>
                ) : (
                    <>
                        <VscChevronRight id="shift_entry_icon"/> 
                    </>
                )}
                <span className="shift_entry_shift"><strong>{t('shift')}:</strong> 00:00 - 00:00 </span>
                <span className="shift_entry_volunteer"><strong>{t('volunteers')}:</strong> 0 / 0</span>
            </button>

            {isOpen ? (
                    <>
                        <ol className='shift_entry_list'>
                            <li><VolunteerEntry name={"John"} lastname={"Smith"} phone={"123 456 7890"} email={"example@example.pl"}/></li>
                            <li><VolunteerEntry name={"Maciej"} lastname={"Nowak"} phone={"123 456 7890"} email={"example@example.pl"}/></li>
                            <li><VolunteerEntry name={"Weronika"} lastname={"Kowalska-Puszcz"} phone={"123 456 7890"} email={"exampleexampleexample@example.pl"}/></li>
                            <li><VolunteerEntry name={"Franciszek"} lastname={"Bąk"} phone={"123 456 7890"} email={"example@example.pl"}/></li>
                        </ol>
                    </>
                ) : (
                    <>
                    </>
                )}
        </div>
    )
}

export default ShiftEntry;