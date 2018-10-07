import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "../../css/RegisterUser.css";
import Footer from "../Footer";
import Confetti from "react-confetti";

// import drawConfetti from '../../Scripts/randomFunctions'

class RegisterUser extends Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
      ismentor: "",
      message: "",
      newUserSignedIn: false,
      showConfetti: false
    };

    this.size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRadioChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerNewUserForm = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      username,
      password,
      passwordConfirmation,
      ismentor
    } = this.state;

    if (!ismentor) {
      this.setState({
        message: "* Please choose: Mentor or Mentee"
      });
      return;
    } else if (password !== passwordConfirmation) {
      this.setState({
        message: "* Passwords do not match"
      });
      return;
    } else if (password === passwordConfirmation) {
      this.setState({
        message: "Passwords match"
      });
    }
    axios
      .post("/users/create", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        ismentor: eval(ismentor)
      })
      .then(res => {
        this.setState({
          message: "Account Created",
          showConfetti: true
        });
        axios
          .post("/users/login", {
            username: username,
            password: password
          })
          .then(res => {
            // redirect to user's profile
            this.props.frontendRegister(this.state);
            this.setState({
              newUserSignedIn: true
            });
            this.props.appLogIn();
          })
          .catch(err => {
            console.log(err);
            this.setState({
              message: "Account Exists Already"
            });
          });
      });
  };

  drawConfetti = () => {
    // drawConfetti()
  };

  render() {
    if (this.state.newUserSignedIn) {
      console.log("hey");
      return <Redirect to="/survey" />;
    }

    const {
      firstname,
      lastname,
      email,
      username,
      password,
      passwordConfirmation,
      message,
      ismentor,
      newUserSignedIn,
      showConfetti
    } = this.state;

    console.log("window size: ", this.size);
    const { handleInputChange, handleRadioChange, registerNewUserForm } = this;

    return (
      <div id="register-container">
        <div id="register-form">
          <h1 id="register-title"> Create an account </h1>

          <form onSubmit={registerNewUserForm}>
            <div className="radio-button font-size">
              Are you a:
              <input
                type="radio"
                name="ismentor"
                value="true"
                onChange={handleRadioChange}
              />
              Mentor
              <input
                type="radio"
                name="ismentor"
                value="false"
                onChange={handleRadioChange}
              />
              Mentee
            </div>
            <label htmlFor="firstname" className="font-size"> First Name </label>
            <input
              className="text-indent"
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="lastname" className="font-size"> Last Name </label>
            <input
              className="text-indent"
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
              required
            />{" "}

            <label htmlFor="email" className="font-size"> Email </label>
            <input
              className="text-indent"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="username" className="font-size"> Username </label>
            <input
              className="text-indent"
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              minLength="6"
              maxLength="12"
              required
            />

            <label htmlFor="password" className="font-size"> Password </label>
            <input
              className="text-indent"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="passwordConfirmation" className="font-size"> Confirm Password </label>
            <input
              className="text-indent"
              type="password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={handleInputChange}
              required
            />
            
            <input
              className="button button-size"
              type="submit"
              value="Create Account"
            />
          </form>

          <div className="register-message">{message}</div>

          <p>
            Already a Member? <Link to="/login"> Log in Here </Link>
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RegisterUser;
