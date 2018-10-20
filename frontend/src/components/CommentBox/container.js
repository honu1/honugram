import React, { Component } from "react";
import CommentBox from "components/CommentBox/presenter";

class Container extends Component {
  state = {
    comment: ""
  };

  render() {
    return (
      <div>
        <CommentBox
          handleInputChange={this._handleInputChange}
          handleKeyPress={this._handleKeyPress}
          {...this.state}
          {...this.props}
        />
      </div>
    );
  }

  _handleInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      comment: value
    });
  };

  _handleKeyPress = event => {
    const { submitComment } = this.props;
    const { comment } = this.state;
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      submitComment(comment);
    }
  };
}

export default Container;
