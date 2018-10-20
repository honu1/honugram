import React, { Component } from "react";
import FeedPhoto from "components/FeedPhoto/presenter";

class Container extends Component {
  state = {
    seeingLikes: false
  };
  render() {
    return (
      <FeedPhoto
        openLikes={this._openLikes}
        closeLikes={this._closeLikes}
        {...this.state}
        {...this.props}
      />
    );
  }

  _openLikes = () =>
    this.setState({
      seeingLikes: true
    });

  _closeLikes = () =>
    this.setState({
      seeingLikes: false
    });
}

export default Container;
