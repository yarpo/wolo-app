import '../../../styles/volunteer-entry.scss';

const VolunteerEntry = ({name, lastname, phone}) => {

    return (
        <div className='volunteer_entry'>
            <span className='volunteer_entry_text'>{name} {lastname}</span>
            <span className='volunteer_entry_phone'>{phone}</span>
        </div>
    )
}

export default VolunteerEntry;