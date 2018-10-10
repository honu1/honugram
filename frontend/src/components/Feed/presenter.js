import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Feed = (props, context) => {
  if (props.loading) {
    return (
      <div>
        <LoadingFeed />
      </div>
    );
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
    <div>Feed Content</div>
    <div>profile</div>
    <div>profile_image</div>
    <div>bio</div>
    <div>like</div>
    <div>comment</div>
  </div>
);

Feed.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Feed;
