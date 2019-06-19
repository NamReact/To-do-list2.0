import React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./index.css";

import Login from "../LoginPage/index";
import Dashboard from "../Dashboard/index";
import ResetPassword from "../ResetPassword";

class App extends React.Component {
  constructor(props) {
    const userData = Cookies.get("todolist");
    super(props);
    this.state = {
      token: userData || null
    };
  }

  setToken = token => {
    this.setState({ token });
  };

  render() {
    return (
      <div className="app-container">
        <Router>
          {this.state.token && <Redirect from="/" to="/dashboard/todolist" />}
          <Route
            path="/"
            exact
            render={() => <Login setToken={this.setToken} />}
          />
          <Route
            path="/reset/:token"
            exact
            render={props => {
              return <ResetPassword match={props.match} />;
            }}
          />

          <Route
            path="/dashboard"
            render={() => <Dashboard token={this.state.token} />}
          />
        </Router>

        {/*  <NavBar /> */}
      </div>
    );
  }
}

export default App;
