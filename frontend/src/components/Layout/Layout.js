import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Toastr from '../Toastr/Toastr';
import moment from 'moment';
//This component basically contains navBar SideBar and Footer. Could wrap the entire application
// To be implemented features:
// 1. Footer
// 2. Render the nav items according the users info and permissions
const Layout = (props) => {

    const currentUser = props.currentUser;
    useEffect(() => {
        //console.log(props);
        // props.retoreUserInfo();
        if (currentUser) {
            props.fetchUserList();
            props.fetchContracts();
        }

    }, [currentUser]);

    // const curUsr = props.usersList.find(item=>item.username==props.currentUser);

    let activeContract = [];
    let expiredContract = [];
    const momNow = moment();
    if (props.currentUserId && props.contractList) {

        props.contractList.forEach(item => {
            if (item.employee === props.currentUserId) {
                if (moment(item.startDate) < momNow && momNow < moment(item.endDate)) {
                    activeContract.push(item);
                } else {
                    expiredContract.push(item);
                }
            }
        });
    }
    console.log(activeContract);
    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Toastr />
            <NavBar
                currentUserPerm={props.currentUserPerm}
                currentUser={props.currentUser} />
            <SideBar
                activeContract={activeContract}
                expiredContract={expiredContract}>
            </SideBar>
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
        currentUserId: state.user.currentLogInUserId,
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