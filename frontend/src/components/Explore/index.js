import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  console.log("getExplore");
  console.log(state);
  const {
    user: { userList }
  } = state;
  return {
    userList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExplore: () => {
      dispatch(userActions.getExplore());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
