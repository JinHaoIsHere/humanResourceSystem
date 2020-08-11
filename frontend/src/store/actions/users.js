import * as actionTypes from './actionTypes';
import axios from 'axios';
import { createToastrHelper } from './layout';

export const restoreUser = () => {
    return dispatch => {
        //If the user login info does exist in the localstorage, 
        //then fetch it. Or do nothing.
        const currentUserStr = localStorage.getItem("currentUser");
        const currentUser = JSON.parse(currentUserStr);

        if (currentUser && currentUser.userToken && currentUser.userInfo) {
            const expiredDate = currentUser.userToken.expireDate;
            if (!expiredDate || new Date(expiredDate).getTime() < new Date()) {
                dispatch({ type: actionTypes.LOGOUT });
                return;
            }
            dispatch({
                type: actionTypes.LOGIN,
                username: currentUser.userInfo.firstName + ' ' + currentUser.userInfo.lastName,
                userid: currentUser.userInfo._id,
                email: currentUser.userInfo.email,
                permission: currentUser.userInfo.permission,
                token: currentUser.userToken.token,
                expireDate: currentUser.userToken.expireDate,
            })
        } else {
            dispatch({ type: actionTypes.LOGOUT });
        }
    }
}

export const loginUser = (userToken, userInfo) => {
    //save username and token to the localstorage
    const currentUser = JSON.stringify({ userToken: userToken, userInfo: userInfo });
    //console.log(userInfo);
    localStorage.setItem('currentUser', currentUser);
    return {
        type: actionTypes.LOGIN,
        username: userInfo.firstName + ' ' + userInfo.lastName,
        userid: userInfo._id,
        email: userInfo.email,
        permission: userInfo.permission,
        token: userToken.token,
        expireDate: userToken.expireDate,
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
                //console.log(res.data);
                dispatch({ type: actionTypes.SET_USERS_LIST, usersList: res.data.userslist })
            })
            .catch(err => {
                console.log(err);
                createToastrHelper(dispatch, 'error', err.response.data);
            })
    }
}