import React, { Component } from "react";
import "../css/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <hr />
        <ul>
          <p id="copyright">
            Tutelage Inc.&trade; Copyright © 2018 Until Infinity
          </p>
          <p id="rights">All Rights Reserved</p>
          <p className="hqSection">
            527 Innovation Parkway, Suite 7, New York, NY 10001
          </p>
        </ul>

        <a href="https://github.com/Acostill/Tutelage">
          <img
            id="githubLogo"
            src="./images/githubplainlogo.svg"
            alt="Github Repository"
          />
        </a>

        <p id="tagline">Reach out to your full potential.&trade;</p>
      </footer>
    );
  }
}

export default Footer;
