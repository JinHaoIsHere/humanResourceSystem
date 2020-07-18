import * as actionTypes from '../actions/actionTypes';

const initialState = {
    toastList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_TOAST:
            const updateList = state.toastList.concat(action.toast);
            return {
                ...state,
                toastList: updateList,
            }
        case actionTypes.REMOVE_TOAST:
            const updatedList = state.toastList.filter((item)=>item.id!==action.id);
            return {
                ...state,
                toastList: updatedList,
            }
        default:
            return state;
    }
};

export default reducer;