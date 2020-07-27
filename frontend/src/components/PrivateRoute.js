import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { isLogin } from '../utils';
import { connect } from 'react-redux';
const PrivateRoute = (props) => {

    if (props.currentUser) {
        return (
        <Route {...props}>{props.children}</Route>
        )
    } else {
        return (<Route render={()=><Redirect to='/login'/>}
             />)
    }
};

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentLogInUser
    }
}

export default connect(mapStateToProps)(PrivateRoute);