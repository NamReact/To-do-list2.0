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

import NavBar from "../../components/NavBar/index";

import Login from "../LoginPage/index";

class App extends React.Component {
  constructor(props) {
    const userData = Cookies.get("todolist");
    super(props);
    this.state = {
      token: userData || null
    };
  }

  setToken = token => {
    console.log(token);
    this.setState({ token });
  };

  render() {
    return (
      <div className="app-container">
        <Router>
          <Switch>
            {this.state.token && <Redirect from="/" to="/dashboard" />}
            <Route
              path="/"
              exact
              render={props => <Login setToken={this.setToken} />}
            />
            <Route path="/dashboard" exact component={NavBar} />
          </Switch>
        </Router>

        {/*  <NavBar /> */}
      </div>
    );
  }
}

export default App;
