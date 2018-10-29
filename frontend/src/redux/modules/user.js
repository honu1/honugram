// imports

// action

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_EXPLORE = "SET_EXPLORE";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";

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

function setUserList(userList) {
  return {
    type: SET_USER_LIST,
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

function setImageList(imageList) {
  console.log("setImageList");
  console.log(imageList);
  return {
    type: SET_IMAGE_LIST,
    imageList
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
      .then(json => dispatch(setUserList(json)))
      .catch(err => console.log(err));
  };
}

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(doFollowUser(userId));

    const {
      user: { token }
    } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
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
    fetch(`/users/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
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

function searchByTerm(searchTerm) {
  return async (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const userList = await searchUsers(token, searchTerm);
    const imageList = await searchImages(token, searchTerm);
    if (userList === 401 || imageList === 401) {
      console.log("not search list");
      return dispatch(logout());
    }
    console.log("search list");
    console.log(userList);
    console.log(imageList);
    dispatch(setUserList(userList));
    dispatch(setImageList(imageList));
  };
}

function searchUsers(token, searchTerm) {
  return fetch(`/users/search/?username=${searchTerm}`, {
    headers: {
      method: "GET",
      Authorization: `JWT ${token}`
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }

      return response.json();
    })
    .then(json => json);
}

function searchImages(token, searchTerm) {
  return fetch(`/images/search/?hashtags=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }

      return response.json();
    })
    .then(json => json);
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
    case SET_IMAGE_LIST:
      return applySetImageList(state, action);
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

function applySetImageList(state, action) {
  const { imageList } = action;

  return {
    ...state,
    imageList
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
  getExplore,
  searchByTerm
};

export { actionCreators };

// export reducer by default
export default reducer;
