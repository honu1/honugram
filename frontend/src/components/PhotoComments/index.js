import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PhotoComments = props => (
  <div className={styles.comments}>
    <ui className={styles.list}>
      <Comment
        className={styles.comment}
        usermae={props.creator}
        comment={props.caption}
      />
      {props.comments.map(comment => (
        <Comment
          username={comment.creator.username}
          comment={comment.message}
          key={comment.id}
        />
      ))}
    </ui>
  </div>
);

const Comment = props => {
  console.log("comment 이거 왜 점나오냐");
  console.log(props);
  return (
    <li className={styles.comment}>
      <span className={styles.username}>{props.username}</span>{" "}
      <span className={styles.message}>{props.comment}</span>
    </li>
  );
};

PhotoComments.propTypes = {
  caption: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};
export default PhotoComments;
