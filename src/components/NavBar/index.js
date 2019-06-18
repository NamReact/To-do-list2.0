import React from "react";
import NavBarBlock from "../NavBarBlock/index";
import "./index.css";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar-container">
        <NavBarBlock id="Home" />
        <NavBarBlock id="Test" />
        <NavBarBlock id="Test2" />
        <NavBarBlock id="Test3" />
        <NavBarBlock id="Test4" />
        <NavBarBlock id="Test5" />
      </div>
    );
  }
}

export default NavBar;
