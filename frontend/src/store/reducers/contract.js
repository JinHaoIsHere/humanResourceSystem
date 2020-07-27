import * as actionsType from '../actions/actionTypes';

const initialState = {
    contractList: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionsType.SET_CONTRACT_LIST:
            return {
                ...state,
                contractList: action.contractList,
            }
        default:
            return state;
    }
};

export default reducer;