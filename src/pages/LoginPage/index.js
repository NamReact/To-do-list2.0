import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./index.css";

class Login extends React.Component {
  state = {
    input: {
      email: "",
      password: ""
    },
    register: false,
    errorEmail: false,
    error: false
  };

  setInput = e => {
    const input = this.state.input;
    input[e.target.name] = e.target.value;
    this.setState({ input });
  };

  setRegister = () => {
    this.setState({ register: !this.state.register });
  };

  emailValidation = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  };

  register = async () => {
    try {
      if (this.emailValidation(this.state.input.email) === false) {
        this.setState({ errorEmail: true });
        setTimeout(() => this.setState({ errorEmail: false }), 2000);
        return;
      }
      const response = await axios.post(
        "http://localhost:3001/user/create",
        this.state.input
      );
      Cookies.set("todolist", response.data);
      this.props.setToken(response.data);
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-title">TO-DO-LIST2.0</div>
        <div className="login-input-container">
          <h3>{this.state.register ? "Create an account" : "Welcome back"}</h3>
          <h4>Plan your success !</h4>
          <p className="login-input-label">EMAIL</p>
          <input
            name="email"
            type="text"
            value={this.state.input.email}
            onChange={this.setInput}
          />
          {this.state.errorEmail && (
            <div className="login-error-email">
              Please use a valid email <div className="login-arrow" />
            </div>
          )}
          <p className="login-input-label">PASSWORD</p>
          <input
            name="password"
            type="password"
            value={this.state.input.password}
            onChange={this.setInput}
          />

          {!this.state.register && (
            <div className="login-forgot-password">Forgot your password ?</div>
          )}

          <div
            className="login-button"
            style={this.state.register ? { marginTop: "53px" } : null}
            onClick={this.state.register ? this.register : null}
          >
            {this.state.register ? "Register" : "Login"}
          </div>
          <p className="login-create-account">
            Need an account? <span onClick={this.setRegister}>Register</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
