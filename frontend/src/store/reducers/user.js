import * as actionsType from '../actions/actionTypes';

const initialState = {
    currentLogInToken: null,
    currentLogInUser: '',
    usersList: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionsType.LOGIN:
            return {
                ...state,
                currentLogInToken: action.token,
                currentLogInUser: action.username,
            }
        case actionsType.LOGOUT:
            return {
                ...state,
                currentLogInToken: null,
                currentLogInUser: '',
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