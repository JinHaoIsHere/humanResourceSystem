import * as actionTypes from './actionTypes';


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
                token: currentUser.token
            })
        }else{
            dispatch({});
        }
    }
}

export const loginUser = (username, token)=>{
    //save username and token to the localstorage
    const userInfo = JSON.stringify({username: username, token: token});
    console.log('UserInfo', userInfo);
    localStorage.setItem('currentUser', userInfo);
    return {
        type: actionTypes.LOGIN,
        username: username,
        token: token,
    }
}