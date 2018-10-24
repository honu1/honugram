import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import Ionicon from "react-ionicons";

const UserRow = props => {
  console.log(props);
  return (
    <div className={styles.contatiner}>
      <img
        src={props.user.profile_image || require("images/noPhoto.jpg")}
        alt={props.user.username}
      />

      <span>{props.user.username}</span>
    </div>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  big: PropTypes.bool
};

UserRow.defaultProps = {
  big: false
};

export default UserRow;
