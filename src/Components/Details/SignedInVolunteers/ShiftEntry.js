import { useState} from 'react';
import '../../../styles/shift-entry.scss';
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

const ShiftEntry = () => {
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
                <span className="shift_entry_shift"><strong>Shift</strong> 00:00 - 00:00 </span>
                <span className="shift_entry_volunteer"><strong>Volunteers:</strong> 0 / 0</span>
            </button>

            {isOpen ? (
                    <>
                        Volunteer
                    </>
                ) : (
                    <>
                    </>
                )}
        </div>
    )
}

export default ShiftEntry;