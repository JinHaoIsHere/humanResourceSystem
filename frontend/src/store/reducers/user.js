import * as actionsType from '../actions/actionTypes';

const initialState = {
    currentLogInToken: null,
    currentLogInUser: '',
    currentLogInUserId: '',
    currentLogInUserPerm: [],
    usersList: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionsType.LOGIN:
            return {
                ...state,
                currentLogInToken: action.token,
                currentLogInUser: action.username,
                currentLogInUserPerm: action.permission,
                currentLogInUserId: action.userid,
            }
        case actionsType.LOGOUT:
            return {
                ...state,
                currentLogInToken: null,
                currentLogInUser: '',
                currentLogInUserPerm: [],
                currentLogInUserId: '',
            }
        case actionsType.SET_USERS_LIST:
            return {
                ...state,
                usersList: action.usersList,
            }
        default:
            return state;
    }
};

export default reducer;