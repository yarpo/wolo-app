import { Component } from "react";
import "./Navbar.css";
class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({clicked: !this.state.clicked});
  }
  render(){
    return (
      <>
        <nav>
          <a href="/#" id="logo">LOGO</a>
          <ul id="navbar" className={this.state.clicked ? "#navbar active" : "navbar"}>
            <li><a href="/#">All Events</a></li>
            <li><a href="/#">Calendar</a></li>
            <li><a href="/#">For Volunteers</a></li>
            <li><a href="/#">They Need You</a></li>
            <li><a href="/#">Login</a></li>
          </ul>  
          <div id="mobile"onClick={this.handleClick} >
            <i id="bar"
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;