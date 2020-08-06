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

    const currentUser = props.currentUser;
    useEffect(() => {
        //console.log(props);
        // props.retoreUserInfo();
        if(currentUser){
            props.fetchUserList();
            props.fetchContracts();
        }
        
    }, [currentUser]);

    const curUsr = props.usersList.find(item=>item.username==props.currentUser);
    
    let activeContract = [];
    if(curUsr && props.contractList){
        activeContract=props.contractList.filter(item=>{
            return item.employee===curUsr._id;
        });
    }
    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Toastr/>
            <NavBar currentUserPerm={props.currentUserPerm} currentUser={props.currentUser}/>
            <SideBar activeContract = {activeContract}></SideBar>
            <div style={{ width: '100%', textAlign: 'center'}}>
                <Toolbar />
                {props.children}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentLogInUser,
        currentUserPerm: state.user.currentLogInUserPerm,
        contractList: state.contract.contractList,
        usersList: state.user.usersList,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        retoreUserInfo: () => dispatch(actions.restoreUser()),
        fetchUserList: () => dispatch(actions.fetchUserList()),
        fetchContracts: () => dispatch(actions.fetchContracts()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);