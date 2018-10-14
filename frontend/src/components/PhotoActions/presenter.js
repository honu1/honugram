import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const PhotoActions = (props, context) => (
  <div className={styles.actions}>
    <div className={styles.icons}>
      <span>
        <Ionicon
          className={styles.icon}
          icon="ios-heart-outline"
          fontSize="28px"
          color="black"
        />
      </span>
      <span>
        <Ionicon
          className={styles.icon}
          icon="ios-text-outline"
          fontSize="28px"
          color="black"
        />
      </span>
    </div>
    <span className={styles.likes}>
      {props.number}
      {props.number === 1 ? context.t("like") : context.t("likes")}
    </span>
  </div>
);

PhotoActions.contextTypes = {
  t: PropTypes.func.isRequired
};

PhotoActions.propTypes = {
  number: PropTypes.number.isRequired
};

export default PhotoActions;
