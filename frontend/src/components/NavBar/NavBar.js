import React from 'react';
import myclasses from './NavBar.module.css';
import { AppBar, Toolbar, Typography, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const NavBar = () => {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
          },
          appBar: {
            zIndex: theme.zIndex.drawer + 1,
          },
          drawer: {
            width: drawerWidth,
            flexShrink: 0,
          },
          drawerPaper: {
            width: drawerWidth,
          },
          drawerContainer: {
            overflow: 'auto',
          },
          content: {
            flexGrow: 1,
            padding: theme.spacing(3),
          },
    }));
    const classes = useStyles();

    return (
        <React.Fragment>

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Authright HRS
                    </Typography>
                    <ul className={myclasses.NavItems}>
                        <li>HOME</li>
                        <li>USERS</li>
                    </ul>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavBar