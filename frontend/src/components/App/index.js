import { connect } from 'react-redux'
import Container from './container'

const mapToStateProps = (state, ownProps) => {
  const { user } = state;

  return {
    isLoggedIn: user.isLoggedIn
  };
};

export default connect(mapToStateProps)(Container);