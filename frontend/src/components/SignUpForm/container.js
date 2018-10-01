import React, { Component } from "react";
import SignUpForm from "./presenter";

class Container extends Component {
  state = {
    fullname: "",
    email: "",
    username: "",
    password: ""
  };
  render() {
    const { fullname, email, username, password } = this.state;
    return (
      <SignUpForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        fullnameValue={fullname}
        emailValue={email}
        usernameValue={username}
        passwordValue={password}
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
  };
}

export default Container;
