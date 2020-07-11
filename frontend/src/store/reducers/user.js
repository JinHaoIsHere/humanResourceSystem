import * as actionsType from '../actions/actionTypes';

const initialState = {
    currentLogInToken: null,
    currentLogInUser: '',
}

const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === actionsType.LOGIN) {
        return {
            ...state,
            currentLogInToken: action.token,
            currentLogInUser: action.username,
        }
    }
    if (action.type === actionsType.LOGOUT) {
        return {
            ...state,
            currentLogInToken: null,
        }
    }
    return state;
};

export default reducer;