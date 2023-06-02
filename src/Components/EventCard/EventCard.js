import './EventCard.css';

const EventCard = () => {
    return (
        <div className="card">
            <img src="#" />
            <div>
                <h2>Event title will go there...</h2>
                <ul>
                    <li>Location: </li>
                    <li>Date: </li>
                    <li>Time: </li>
                    <li>Organized by: </li>
                    <li>Needed: X</li>
                    <li>Signed In: X</li>
                </ul>
            </div>
        </div>
    )
};

export default EventCard;