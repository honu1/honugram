import React from "react";
import PropTypes from "prop-types";

const Feed = (props, context) => (
  <div>
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
