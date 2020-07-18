import * as actionTypes from './actionTypes';

export const createToastr = (type, message) => {
    return dispatch => {
        createToastrHelper(dispatch, type, message);
    }
}

export const createToastrHelper = (dispatch, type, message) => {
    const id = Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
    dispatch({ type: actionTypes.ADD_TOAST, toast: { type: type, message: message, id: id } });
    setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_TOAST, id: id });
    }, 3000);
}