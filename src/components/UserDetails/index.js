import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DashboardContext } from "../../pages/Dashboard";
import { useEmailValidation } from "../../hooks/useEmailValidation";
import { useEmptyInput } from "../../hooks/useEmptyInput";

import "./index.css";

const UserDetails = () => {
  const context = useContext(DashboardContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const emailValidation = useEmailValidation(email);
  const checkEmptyPassword = useEmptyInput(currentPassword);
  const checkEmptyNewPassword = useEmptyInput(newPassword);

  const getUser = async () => {
    if (context.state.token) {
      const response = await axios.get(
        "https://todolist-nam-back.herokuapp.com/user",
        {
          headers: { authorization: `Bearer ${context.state.token}` }
        }
      );
      setFirstName(response.data.firstName ? response.data.firstName : "");
      setLastName(response.data.lastName ? response.data.lastName : "");
      setEmail(response.data.email ? response.data.email : "");
    }
  };

  useEffect(() => {
    getUser();
    return () => {
      setRedirect(false);
    };
    // eslint-disable-next-line
  }, []);

  const save = async () => {
    if (emailValidation === false) {
      setErrorEmail(true);
      return;
    }
    await axios.post(
      "https://todolist-nam-back.herokuapp.com/user/update",
      {
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      { headers: { authorization: `Bearer ${context.state.token}` } }
    );
  };

  const changePasswordRequest = async () => {
    try {
      if (checkEmptyNewPassword === false && checkEmptyPassword === false) {
        await axios.post(
          "https://todolist-nam-back.herokuapp.com/user/change-password",
          {
            currentPassword: currentPassword,
            newPassword: newPassword
          },
          { headers: { authorization: `Bearer ${context.state.token}` } }
        );
        alert("You will now be disconnected. Please log in again.");
        Cookies.remove("todolist2.0-nam");
        setRedirect(true);
        return;
      }
      return console.log("we cannot go");
    } catch (error) {
      if (error.response.status) {
        setErrorPassword(true);
      }
    }
  };

  const redirectLogin = () => {
    setRedirect(false);
    return (window.location.href = "http://localhost:3000/");
  };

  return (
    <div className="user-details-container">
      {redirect ? redirectLogin() : null}
      <div className="user-details">
        <div>
          <img src={require("../../img/avatar.png")} alt="placeholder-avatar" />
        </div>
        <div className="user-details-input-container">
          <div className="user-details-input-label">
            FIRST NAME<span> *</span>
          </div>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <div className="user-details-input-label">
            LAST NAME <span> *</span>
          </div>
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
          <div
            className="user-details-input-label"
            style={errorEmail ? { color: "var(--red)" } : null}
          >
            EMAIL <span> *</span> {errorEmail && <span> Invalid email</span>}
          </div>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={errorEmail ? { border: "1px solid var(--red)" } : null}
          />
          {!changePassword && (
            <div
              className="user-details-change-password-button"
              onClick={() => setChangePassword(true)}
            >
              Change password?
            </div>
          )}
          {changePassword && (
            <div className="user-details-password-container">
              <div
                className="user-details-input-label"
                style={errorPassword ? { color: "var(--red)" } : null}
              >
                CURRENT PASSWORD <span> *</span>{" "}
                {errorPassword && <span> Wrong password</span>}
              </div>
              <input
                value={currentPassword}
                type="password"
                onChange={e => setCurrentPassword(e.target.value)}
                style={
                  errorPassword ? { border: "1px solid var(--red)" } : null
                }
              />
              <div className="user-details-input-label">
                NEW PASSWORD <span> *</span>
              </div>
              <input
                value={newPassword}
                type="password"
                onChange={e => setNewPassword(e.target.value)}
              />
              <div
                className="user-details-button user-details-save user-details-save-password-button"
                onClick={changePasswordRequest}
              >
                Change password
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="user-details-buttons-container">
        <div className="user-details-button user-details-delete">
          Delete account
        </div>
        <div className="user-details-button user-details-save" onClick={save}>
          Save
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
