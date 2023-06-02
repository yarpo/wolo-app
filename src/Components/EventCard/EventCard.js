import { VscLocation } from "react-icons/vsc";
import './EventCard.css';

const EventCard = () => {
    return (
        <div className="card">
            <img src="#" />
            <div id="information">
                <h2>Event title will go there...</h2>
                <ul>
                    <li><VscLocation className="icon"/> Location: </li>
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