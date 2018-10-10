import React from "react";
import styles from "./style.scss";

const Loading = props => (
  <div className={styles.container}>
    <img
      src={require("images/loading.png")}
      className={styles.spinner}
      alt="loding"
    />
  </div>
);

export default Loading;
