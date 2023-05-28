import './Details.css';

const Details = () => {
    return (
        <div>
            <div id="container">
                <div id="column">
                    <a href="/#" id="back">Back</a>
                    <h2 id="title">Event details will show up here...</h2>
                    <ul id="volunteers_numbers">
                        <li><strong>X</strong> have been signed in</li>
                        <li><strong>X</strong> more is needed</li>
                    </ul>
                    <ul id="information">
                        <li>Date: </li>
                        <li>Time: </li>
                        <li>Category: </li>
                        <li>Organizer: </li>
                    </ul>
                </div>
                <div id="column">
                    <img alt="photo" />
                </div>
                <p id="description">Description</p>
                <div id="column">
                    <p id="location">Location: </p>
                </div>
                <div id="column">
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    )
};

export default Details;