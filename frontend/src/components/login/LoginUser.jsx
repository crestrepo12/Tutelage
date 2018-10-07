import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer";
import "../../css/LoginUser.css";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      signedIn: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitLoginForm = e => {
    e.preventDefault();
    const { username, password, message } = this.state;
    axios
      .post("/users/login", {
        username: username,
        password: password
      })
      .then(res => {
        console.log(res);
        // redirect to user's profile
        this.setState({
          signedIn: true
        });
      })
      .catch(err => {
        console.log(err);
        if (username === "" && password === "") {
          this.setState({
            message: "* Fill out Username & Password"
          });
        } else {
          this.setState({
            username: "",
            password: "",
            message: "* Username / Password Incorrect"
          });
        }
      });
  };

  render() {
    // const { username, password, message, signedIn } = this.state;
    const {
      handleInputChange,
      submitLoginForm,
      username,
      password,
      message,
      signedIn,
      user
    } = this.props;
    console.log("USERRR PLEEEASE:", user);
    console.log("USERNAME? PLLLEEEASE:", user.username);

    if (signedIn) {
      return <Redirect to={`/users/${user.username}`} />;
    }

    // can add a cookie/session storage so user doesn't see login page when they are signed in

    return (
      <div className="login-form-container">
        <div id="login-form">
          <h1 id="login-title">
            {" "}
            Welcome Back!{" "}
          </h1>

          <form>
            <label htmlFor="username" className="font-size">
              {" "}
              Username{" "}
            </label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={handleInputChange}
              className="text-indent"
            />

            <label htmlFor="password" className="font-size">
              {" "}
              Password{" "}
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              className="text-indent"
            />

            <button className="button button-size" onClick={submitLoginForm}>
              {" "}
              Log in{" "}
            </button>
          </form>

          <p className="message">{message}</p>

          <p>
            Not a member? <Link to="/register"> Register here. </Link>
          </p>
        </div>

        <Footer />
      </div>
    );
  }
}

export default LoginUser;
