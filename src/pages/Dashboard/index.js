import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../../components/NavBar";
import SubNavigation from "../../components/SubNavigation";
import NavItem from "../../components/NavItem";
import ToDo from "../../pages/ToDo";
import Settings from "../../pages/Settings";
import "./index.css";

export const DashboardContext = React.createContext();

class Dashboard extends React.PureComponent {
  state = {
    selectedBlock: "Home",
    selectedNavItem: "To do list",
    selectedDate: "",
    token: this.props.token
  };

  logOut = () => {
    Cookies.remove("todolist2.0-nam");
    this.props.setToken("");
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/" />;
    }
    return (
      <DashboardContext.Provider
        value={{
          state: this.state,
          setState: this.setState.bind(this)
        }}
      >
        <div className="dashboard-container">
          <NavBar setSelectedBlock={this.setSelectedBlock} />
          <SubNavigation>
            {this.state.selectedBlock === "Home" ? (
              <div>
                <Link to={"/dashboard/todolist/" + this.state.selectedDate}>
                  <NavItem id="To do list" />
                </Link>
                <Link to="/dashboard/settings">
                  <NavItem id="Settings" />
                </Link>
                <div className="dashboard-log-out" onClick={this.logOut}>
                  Log out
                </div>
              </div>
            ) : null}
          </SubNavigation>
          <Route path="/dashboard/todolist" component={ToDo} />
          <Route path="/dashboard/settings" component={Settings} />
        </div>
      </DashboardContext.Provider>
    );
  }
  componentDidMount() {
    this.setState({ token: this.props.token });
  }
}

export default Dashboard;
