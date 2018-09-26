// imports

// action

// action creator

// initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jwt") ? true : false,
}

// reducer
function reducer(state= initialState, action) {
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