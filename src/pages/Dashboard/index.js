import React from "react";
import NavBar from "../../components/NavBar";
import "./index.css";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <NavBar />
      </div>
    );
  }
}

export default Dashboard;
