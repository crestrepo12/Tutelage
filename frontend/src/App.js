import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import LoginUser from './components/login/LoginUser';
import RegisterUser from './components/login/RegisterUser';
import SearchUsers from './components/users/SearchUsers';
import Users from './components/users/Users'
// import Profile from './components/users/profile/Profile';

class App extends Component {
  render() {
    return (
      <div>
      <nav>
        <Link id="appName" to="/"> Tutelage </Link>
        {" "}
        <Link to="/login"> Log In </Link>
        {" "}
        <Link to="/register"> Register </Link>
        {" "}
        <Link to="/aboutus"> About Us </Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginUser} />
        <Route path="/register" component={RegisterUser} />
        <Route path="/search" component={SearchUsers} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/users" component={Users} />
        {/* <Route path="/users/:profile" component={Profile} /> */}
      </Switch>
      </div>
    );
  }
}

export default App;
