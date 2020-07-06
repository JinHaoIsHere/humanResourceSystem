import React from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { CssBaseline, Toolbar } from '@material-ui/core';

//This component basically contains navBar SideBar and Footer. Could wrap the entire application
// To be implemented features:
// 1. Footer
// 2. Render the nav items according the users info and permissions
const Layout = (props) => {
    return (
        <div  style={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            <SideBar></SideBar>
            <div style={{ width: '100%', textAlign:'center'}}>
                <Toolbar />
                {props.children}
            </div>
        </div>
    );
}

export default Layout;