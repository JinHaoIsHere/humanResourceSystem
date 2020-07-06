import * as actionsType from './actions';

const initialState = {
    currentLogIn: null,
}

const reducer = (state = initialState, action) => {
    if (action.type === actionsType.LOGIN) {
        return {
            ...state,
            currentLogIn: null,
        }
    }
    if (action.type === actionsType.LOGOUT) {
        return {
            ...state,
            currentLogIn: null,
        }
    }
    return state;
};

export default reducer;