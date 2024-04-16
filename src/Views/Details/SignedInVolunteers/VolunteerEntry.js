import '../../../styles/volunteer-entry.scss';

const VolunteerEntry = ({name, lastname, phone, email}) => {

    return (
        <div className='volunteer_entry'>
            <div className='volunteer_entry_text'>
                <span>{name} {lastname}</span>
            </div>
            <div className='volunteer_entry_phone'>
                <span>{phone}</span>
            </div>
            <div className='volunteer_entry_email'>
                <span>{email}</span>
            </div>
        </div>
    )
}

export default VolunteerEntry;