// imports

// action

// action creator
function usernameLogin(username, password) {
  return function(dispatch) {
    fetch("/rest-auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password
      })
    });
  };
}

// initial state
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
};

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    // case value:

    //     break;

    default:
      return state;
  }
}
// functon

// exports
export default reducer;
