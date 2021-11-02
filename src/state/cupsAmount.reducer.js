import {ADD_CUP, SET_CUPS, SET_STATE} from "./actionTypes";

const initialState = {
    cups: 0,
    freeCupsGot: 0,
    uid: '',
    photoURL: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_CUP:
            return {...state, cups: state.cups + 1};
        case SET_CUPS:
            return {...state, cups: action.payload};
        case SET_STATE:
            return {...action.payload};
        default:
            return state
    }
}
export default reducer
