import { connect } from "react-redux";
import Container from "./container";

import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("mapDispatchToProps");
  return {
    getLikePhoto: () => {
      dispatch(userActions.getLikePhoto(ownProps.id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
