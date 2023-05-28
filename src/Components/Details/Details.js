import './Details.css';

const Details = () => {
    return (
        <div>
            <div id="container">
                <div id="column">
                    <a href="/#" id="back">Back</a>
                    <h1 id="title">Event details will show up here...</h1>
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
                <div id="column" class="photo">
                    <img alt="photo" />
                </div>
                <p id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla est sit amet ultricies tempus. 
                Praesent ultricies, arcu at lobortis porttitor, risus erat porta purus, at imperdiet sapien turpis vitae dolor. 
                Fusce congue porttitor metus sit amet vehicula. Etiam commodo volutpat vulputate. Donec in dolor a orci laoreet tristique vitae
                 ut ipsum. Quisque commodo, tortor quis efficitur vestibulum, nibh nisl maximus risus, sed imperdiet felis tortor eget tellus. 
                 Morbi pellentesque vehicula sem et tempus. In sapien leo, tincidunt at nisl sit amet, luctus venenatis quam. Maecenas malesuada 
                 at erat eu viverra.</p>
                <div id="column" class="location">
                    <p id="location">Location: </p>
                </div>
                <div id="column" class="signin">
                    <button>Sign in</button>
                </div>
            </div>
        </div>
    )
};

export default Details;