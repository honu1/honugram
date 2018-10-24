import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = state => {
  console.log("mapStateToProps");
  console.log(state);

  const {
    user: { userList }
  } = state;

  return {
    userList
  };
};
export default connect(mapStateToProps)(Container);
