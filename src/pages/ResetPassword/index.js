import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./index.css";

class ResetPassword extends React.Component {
  state = {
    newPassword: "",
    confirmNewPassword: "",
    errorNewPassword: false,
    errorPasswordMatch: false,
    redirect: false
  };

  setPassword = e => {
    this.setState({ newPassword: e.target.value });
  };

  setConfirmPassword = e => {
    this.setState({ confirmNewPassword: e.target.value });
  };

  passwordValidation = password => {
    const re = /^\s*$/;
    return re.test(String(password));
  };

  resetPassword = async () => {
    if (this.passwordValidation(this.state.newPassword) === true) {
      this.setState({ errorNewPassword: true });
      return;
    }
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({ errorNewPassword: true, errorPasswordMatch: true });
      return;
    }
    try {
      await axios.post("http://localhost:3001/user/reset-password", {
        token: this.props.match.params.token,
        newPassword: this.state.newPassword
      });
      alert(
        "Your password has been changed. You will be redirected to the login page"
      );
      this.setState({ redirect: true });
      return;
    } catch (error) {
      if (error.response.status === 404) {
        alert("Oops ! this user doesn't exist");
        this.setState({ redirect: true });
      }
      console.log(error.message);
    }
  };

  render() {
    return (
      <div className="reset-password-container">
        {this.state.redirect && <Redirect to="/" />}
        <div className="reset-password-input-container">
          <h3>Change your password</h3>
          <div
            className="reset-password-label"
            style={this.state.errorNewPassword ? { color: "#F26C82" } : null}
          >
            PASSWORD
            {this.state.errorNewPassword
              ? this.state.errorPasswordMatch
                ? " - Passwords doesn't match"
                : " - Can't be empty or contain white space"
              : false}
          </div>
          <input
            name="password"
            type="password"
            value={this.state.newPassword}
            onChange={this.setPassword}
            style={
              this.state.errorNewPassword
                ? { border: "2px solid #F26C82" }
                : null
            }
          />
          <div
            className="reset-password-label"
            style={this.state.errorPasswordMatch ? { color: "#F26C82" } : null}
          >
            CONFIRM PASSWORD
          </div>
          <input
            name="confirm password"
            type="password"
            value={this.state.confirmNewPassword}
            onChange={this.setConfirmPassword}
            style={
              this.state.errorPasswordMatch
                ? { border: "2px solid #F26C82" }
                : null
            }
          />
          <div className="reset-password-button" onClick={this.resetPassword}>
            Change password
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
