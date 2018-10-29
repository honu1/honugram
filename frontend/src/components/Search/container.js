import React, { Component } from "react";
import PropTypes from "prop-types";
import Search from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    userList: PropTypes.array,
    imageList: PropTypes.array
  };
  componentDidMount() {
    const { searchByTerm } = this.props;
    console.log("componentDidMount - Search");

    searchByTerm();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchByTerm } = this.props;
    console.log("componentDidUpdate - Search");
    if (prevProps.match.params !== this.props.match.params) {
      console.log("componentDidUpdate - not matched");
      searchByTerm();
    }
  }

  componentWillReceiveProps = nextProps => {
    const { searchByTerm, pathname } = this.props;
    console.log(nextProps);
    console.log("componentWillReceiveProps - Search");
    if (nextProps.userList && nextProps.imageList) {
      this.setState({
        loading: false
      });
    }

    if (nextProps.pathname !== pathname) {
      searchByTerm();
    }
  };
  render() {
    const { userList, imageList } = this.props;
    return <Search {...this.state} userList={userList} imageList={imageList} />;
  }
}

export default Container;
