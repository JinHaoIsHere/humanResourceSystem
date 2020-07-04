import React from 'react';
import NavBar from '../NavBar/NavBar';
import SideBar from '../SideBar/SideBar';
import { CssBaseline, Toolbar } from '@material-ui/core';
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