import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Toastr from '../Toastr/Toastr';
//This component basically contains navBar SideBar and Footer. Could wrap the entire application
// To be implemented features:
// 1. Footer
// 2. Render the nav items according the users info and permissions
const Layout = (props) => {

    useEffect(() => {
        //console.log(props);
        // props.retoreUserInfo();
        if(props.currentUser){
            props.fetchUserList();
        }
        
    });

    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Toastr/>
            <NavBar currentUserPerm={props.currentUserPerm}/>
            <SideBar></SideBar>
            <div style={{ width: '100%', textAlign: 'center' }}>
                <Toolbar />
                {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentLogInUser,
        currentUserPerm: state.user.currentLogInUserPerm
    }
}


const mapDispatchToProps = dispatch => {
    return {
        retoreUserInfo: () => dispatch(actions.restoreUser()),
        fetchUserList: () => dispatch(actions.fetchUserList()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);