import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedPhoto from "components/FeedPhoto/presenter";

class Container extends Component {
  state = {
    seeingLikes: false
  };

  static propTypes = {
    getLikePhoto: PropTypes.func.isRequired,
    userList: PropTypes.array
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

  _openLikes = () => {
    console.log(this.props);
    const { getLikePhoto } = this.props;
    this.setState({
      seeingLikes: true
    });

    getLikePhoto();
  };

  _closeLikes = () =>
    this.setState({
      seeingLikes: false
    });
}

export default Container;
