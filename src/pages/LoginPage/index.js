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
    error: false,
    errorLogin: false,
    errorEmail: false,
    errorPassword: false,
    wrongEmail: false,
    wrongPassword: false,
    wrongEmailForgotPassword: false,
    popup: false
  };

  setInput = e => {
    const input = this.state.input;
    input[e.target.name] = e.target.value;
    this.setState({ input });
  };

  setRegister = () => {
    this.setState({ register: !this.state.register });
  };

  setPopup = () => {
    this.setState({ popup: !this.state.popup });
  };

  emailValidation = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
  };

  passwordValidation = password => {
    const re = /^\s*$/;
    return re.test(String(password));
  };

  identificationCheck = () => {
    if (this.emailValidation(this.state.input.email) === false) {
      this.setState({ errorEmail: true });
      setTimeout(() => this.setState({ errorEmail: false }), 2000);
      return false;
    }
    if (this.passwordValidation(this.state.input.password) === true) {
      this.setState({ errorPassword: true });
      setTimeout(() => this.setState({ errorPassword: false }), 2000);
      return false;
    }
    return true;
  };

  setCookie = token => {
    Cookies.set("todolist", token);
    this.props.setToken(token);
    return;
  };

  register = async () => {
    if (this.identificationCheck() === false) {
      return;
    }
    try {
      const response = await axios.post(
        "https://todolist-nam-back.herokuapp.com/user/create",
        this.state.input
      );
      this.setCookie(response.data);
    } catch (error) {
      if (error.response.status === 409) {
        this.setState({ error: true, errorEmail: true });
        setTimeout(
          () => this.setState({ error: false, errorEmail: false }),
          2000
        );
        return;
      }
    }
  };

  login = async () => {
    if (this.identificationCheck() === false) {
      return;
    }
    try {
      const response = await axios.post(
        "https://todolist-nam-back.herokuapp.com/user/login",
        this.state.input
      );
      this.setCookie(response.data);
    } catch (error) {
      this.setState({ wrongEmail: true, wrongPassword: true });
    }
  };

  forgotPassword = async () => {
    if (this.emailValidation(this.state.input.email) === false) {
      this.setState({ errorEmail: true });
      setTimeout(() => this.setState({ errorEmail: false }), 2000);
      return false;
    }
    try {
      await axios.post(
        "https://todolist-nam-back.herokuapp.com/user/forgot-password",
        {
          email: this.state.input.email
        }
      );
      this.setPopup();
      return;
    } catch (error) {
      if (error.response.status === 404) {
        this.setState({ wrongEmail: true, wrongEmailForgotPassword: true });
      }
    }
  };

  render() {
    return (
      <div className="login-container">
        {this.state.popup && (
          <div>
            <div className="login-popup-overlay" onClick={this.setPopup} />
            <div className="login-popup-container">
              <h4>Instructions sent</h4>
              <div className="login-popup-body">
                We sent instructions to change your password to :<br />
                <div>{this.state.input.email}</div>
                Please check your inbox and spam folder
              </div>
              <div className="login-popup-button-container">
                <div className="login-popup-button" onClick={this.setPopup}>
                  OK
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="login-title">TO-DO-LIST2.0</div>
        <div className="login-input-container">
          <h3>{this.state.register ? "Create an account" : "Welcome back"}</h3>
          <h4>Plan your success !</h4>
          <p
            className="login-input-label"
            style={this.state.wrongEmail ? { color: "#F26C82" } : null}
          >
            EMAIL
            {this.state.wrongEmail
              ? this.state.wrongEmailForgotPassword
                ? " doesn't exist"
                : " - Wrong email or password"
              : false}
          </p>
          <input
            name="email"
            type="text"
            value={this.state.input.email}
            onChange={this.setInput}
            style={
              this.state.wrongEmail ? { border: "2px solid #F26C82" } : null
            }
          />
          {this.state.errorEmail && (
            <div className="login-error-email">
              {this.state.error
                ? "This email already exist"
                : "Please use a valid email"}
              <div className="login-arrow" />
            </div>
          )}
          {this.state.errorPassword && (
            <div className="login-error-password">
              Password cannot be empty <div className="login-arrow" />
            </div>
          )}
          <p
            className="login-input-label"
            style={this.state.wrongPassword ? { color: "#F26C82" } : null}
          >
            PASSWORD
          </p>
          <input
            name="password"
            type="password"
            value={this.state.input.password}
            onChange={this.setInput}
            style={
              this.state.wrongPassword ? { border: "2px solid #F26C82" } : null
            }
          />

          {!this.state.register && (
            <div
              className="login-forgot-password"
              onClick={this.forgotPassword}
            >
              Forgot your password ?
            </div>
          )}

          <div
            className="login-button"
            style={this.state.register ? { marginTop: "53px" } : null}
            onClick={this.state.register ? this.register : this.login}
          >
            {this.state.register ? "Register" : "Login"}
          </div>
          <p className="login-create-account">
            {this.state.register ? false : "Need an account? "}
            <span onClick={this.setRegister}>
              {this.state.register ? "Already have an account ?" : "Register"}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
