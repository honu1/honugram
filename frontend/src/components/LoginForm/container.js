import React, { Component } from "react";
import PropTypes from "prop-types";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    usernameLogin: PropTypes.func.isRequired
  };

  render() {
    const { username, password } = this.state;
    return (
      <LoginForm
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        usernameValue={username}
        passwordValue={password}
      />
    );
  }

  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  _handleSubmit = event => {
    console.log("submit");
    const { username, password } = this.state;
    const { usernameLogin } = this.props;
    event.preventDefault();
    usernameLogin(username, password);
  };

  // _handleUsernameLogin(username, password) {}
}

export default Container;
