import * as actionsType from './actions';

const initialState = {
    currentLogInToken: null,
}

const reducer = (state = initialState, action) => {
    console.log(action);
    if (action.type === actionsType.LOGIN) {
        return {
            ...state,
            currentLogInToken: action.token,
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