// imports

// action

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_EXPLORE = "SET_EXPLORE";

// action creator

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function logout(token) {
  return {
    type: LOGOUT
  };
}

function setUserList(photoId, userList) {
  return {
    type: SET_USER_LIST,
    photoId,
    userList
  };
}

function doFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId
  };
}

function doUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId
  };
}

function setExplore(userList) {
  return {
    type: SET_EXPLORE,
    userList
  };
}

// api actions
function usernameLogin(username, password) {
  return function(dispatch) {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password, email, name) {
  return function(dispatch) {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function getLikePhoto(photoId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/images/${photoId}/likes`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }

        return response.json();
      })
      .then(json => dispatch(setUserList(photoId, json)))
      .catch(err => console.log(err));
  };
}

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(doFollowUser(userId));

    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/follow`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        } else if (!response.ok) {
          dispatch(doUnfollowUser(userId));
        }
      })
      .catch(err => console.log(err));
  };
}

function unfollowUser(userId) {
  return (dispatch, getState) => {
    dispatch(doUnfollowUser(userId));

    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/follow`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        } else if (!response.ok) {
          dispatch(doFollowUser(userId));
        }
      })
      .catch(err => console.log(err));
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/explore`, {
      headers: {
        method: "GET",
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }

        return response.json();
      })
      .then(json => dispatch(setExplore(json)))
      .catch(err => console.log(err));
  };
}

// initial state
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt")
};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case FOLLOW_USER:
      return applyFollowUser(state, action);
    case UNFOLLOW_USER:
      return applyUnfollowUser(state, action);
    case SET_EXPLORE:
      return applySetExplore(state, action);
    default:
      return state;
  }
}
// functon

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applySetUserList(state, action) {
  const { userList } = action;

  return {
    ...state,
    userList
  };
}

function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: true };
    }

    return user;
  });

  return {
    ...state,
    userList: updatedUserList
  };
}

function applyUnfollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: false };
    }

    return user;
  });

  return {
    ...state,
    userList: updatedUserList
  };
}

function applySetExplore(state, action) {
  const { userList } = action;

  return {
    ...state,
    userList
  };
}

// exports

const actionCreators = {
  usernameLogin,
  createAccount,
  logout,
  getLikePhoto,
  followUser,
  unfollowUser,
  getExplore
};

export { actionCreators };

// export reducer by default
export default reducer;
