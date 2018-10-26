import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "components/Explore/presenter";

class Container extends Component {
  state = {
    loading: true
  };

  static propTypes = {
    getExplore: PropTypes.func.isRequired,
    userList: PropTypes.array
  };

  componentDidMount() {
    const { getExplore } = this.props;
    if (!this.props.userList) {
      getExplore();
    } else {
      console.log("이미 이미지 있다");
      this.setState({
        loading: false
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.userList) {
      this.setState({
        loading: false
      });
    }
  };

  render() {
    const { userList } = this.props;
    return <Explore {...this.state} userList={userList} />;
  }
}

export default Container;
