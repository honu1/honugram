import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpForm from "./presenter";

class Container extends Component {
  state = {
    fullname: "",
    email: "",
    username: "",
    password: ""
  };

  static propTypes = {
    createAccount: PropTypes.func.isRequired
  };

  render() {
    const { fullname, email, username, password } = this.state;
    return (
      <SignUpForm
        fullnameValue={fullname}
        emailValue={email}
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;

    console.log("change");
    console.log(this.state);

    this.setState({ [name]: value });
  };

  _handleSubmit = event => {
    console.log("submit");
    console.log(this.state);
    event.preventDefault();

    const { fullname, email, username, password } = this.state;
    const { createAccount } = this.props;

    createAccount(username, password, email, fullname);
  };
}

export default Container;
