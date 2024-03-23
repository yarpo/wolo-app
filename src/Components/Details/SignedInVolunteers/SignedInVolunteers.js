import '../../../styles/signed-in-volunteers.scss';
import ShiftEntry from './ShiftEntry';

const SignedInVolunteers = () => {
    return (
        <div className='signed_in_volunteers'>
            <hr />
            <div className='signed_in_volunteers_content'>
                <h2 className='signed_in_volunteers_header'>Participants</h2>
                <button className='signed_in_volunteers_export_button'>Export list</button>
            </div>

            <ShiftEntry />
        </div>
    )
}

export default SignedInVolunteers;