import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
// import Loading from "components/Loading";
// import Ionicon from "react-ionicons";

const UserRow = (props, context) => {
  console.log(props);
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <img
          src={props.user.profile_image || require("images/noPhoto.jpg")}
          alt={props.user.username}
          className={props.big ? styles.bigAvatar : styles.avatar}
        />
        <div className={styles.user}>
          <span className={styles.username}>{props.user.username}</span>
          <span className={styles.name}>{props.user.name}</span>
        </div>
      </div>
      <span className={styles.column}>
        <button className={styles.button} onClick={props.handleHeartClick}>
          {props.user.following ? context.t("Follow") : context.t("Unfollow")}
        </button>
      </span>
    </div>
  );
};

UserRow.contextTypes = {
  t: PropTypes.func.isRequired
};

UserRow.propTypes = {
  user: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    following: PropTypes.bool.isRequired
  }).isRequired,
  big: PropTypes.bool,
  handleHeartClick: PropTypes.func.isRequired
};

UserRow.defaultProps = {
  big: false
};

export default UserRow;