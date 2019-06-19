import React from "react";
import NavBarBlock from "../NavBarBlock/index";
import AddProject from "../AddProject/index";
import "./index.css";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <NavBarBlock id="Home" />
        <div className="navbar-project-container">
          <NavBarBlock id="Project test 1" />
          <NavBarBlock id="Project test 2" />
        </div>
        <AddProject />
      </div>
    );
  }
}

export default NavBar;
