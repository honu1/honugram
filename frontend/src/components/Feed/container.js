import React, { Component } from "react";
import PropTypes from "prop-types";
import Feed from "components/Feed/presenter";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    getFeed: PropTypes.func.isRequired,
    feed: PropTypes.array
  };

  componentDidMount() {
    const { getFeed } = this.props;
    if (!this.props.feed) {
      getFeed();
    } else {
      console.log("이미 이미지 있다");
      this.setState({
        loading: false
      });
    }
    getFeed();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.feed) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { feed } = this.props;
    return <Feed {...this.state} feed={feed} />;
  }
}

export default Container;
