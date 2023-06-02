import { VscBrowser, VscOrganization, VscLocation } from "react-icons/vsc";
import { BiTime } from "react-icons/bi";
import './EventCard.css';

const EventCard = () => {
    return (
        <div className="card">
            <img src="#" />
            <div id="information">
                <h2>Event title will go there...</h2>
                <ul>
                    <li><VscLocation className="icon"/> <strong>Location:</strong> </li>
                    <li><VscBrowser className="icon"/> <strong>Date:</strong> </li>
                    <li><BiTime className="icon"/> <strong>Time:</strong> </li>
                    <li><VscOrganization className="icon"/> <strong>Organized by:</strong> </li>
                    <li><strong>Needed:</strong> X</li>
                    <li><strong>Signed In:</strong> X</li>
                </ul>
            </div>
        </div>
    )
};

export default EventCard;