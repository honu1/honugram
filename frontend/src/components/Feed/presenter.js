import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import FeedPhoto from "components/FeedPhoto";

const Feed = (props, context) => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.feed) {
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
    {props.feed.map(photo => (
      <FeedPhoto {...photo} key={photo.id} />
    ))}
  </div>
);

Feed.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Feed;
