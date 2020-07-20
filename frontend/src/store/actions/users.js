import * as actionTypes from './actionTypes';
import axios from 'axios';
import {createToastrHelper} from './layout';

export const restoreUser = () => {
    return dispatch => {
        //If the user login info does exist in the localstorage, 
        //then fetch it. Or do nothing.
        const currentUserStr = localStorage.getItem("currentUser");
        const currentUser = JSON.parse(currentUserStr);

        if (currentUser && currentUser.username && currentUser.token) {
            dispatch({
                type: actionTypes.LOGIN,
                username: currentUser.username,
                token: currentUser.token,
                permission: currentUser.permission,
            })
        } else {
            dispatch({ type: '', });
        }
    }
}

export const loginUser = (username, token, permission=[]) => {
    //save username and token to the localstorage
    const userInfo = JSON.stringify({ username: username, token: token, permission: permission });
    localStorage.setItem('currentUser', userInfo);
    return {
        type: actionTypes.LOGIN,
        username: username,
        permission: permission,
        token: token,
    }
}

export const logoutUser = () => {
    localStorage.setItem('currentUser', null);
    return {
        type: actionTypes.LOGOUT,
    }
}

export const fetchUserList = () => {
    return dispatch => {
        axios.get('/api/admin/usersList')
            .then(res => {
                console.log(res.data);
                dispatch({ type: actionTypes.SET_USERS_LIST, usersList: res.data.userslist })
            })
            .catch(err => {
                createToastrHelper(dispatch, 'error', err.response.data);
            })
    }
}