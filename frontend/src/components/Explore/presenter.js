import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import UserList from "components/UserList";

const Explore = (props, context) => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.userList) {
    console.log(props);
    return <RenderFeed {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

const RenderFeed = props => (
  <div className={styles.feed}>
    {props.userList.map(photo => (
      <UserList {...photo} key={photo.id} />
    ))}
  </div>
);

Explore.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Explore;
