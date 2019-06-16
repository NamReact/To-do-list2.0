import React from "react";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

import Login from "../LoginPage/index";
import Dashboard from "../Dashboard/index";

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
          {this.state.token && <Redirect from="/" to="/dashboard" />}
          <Route
            path="/"
            exact
            render={() => <Login setToken={this.setToken} />}
          />

          {this.state.token ? (
            <Route
              path="/dashboard"
              exact
              render={() => <Dashboard token={this.state.token} />}
            />
          ) : (
            <Redirect to="/" />
          )}
        </Router>

        {/*  <NavBar /> */}
      </div>
    );
  }
}

export default App;
