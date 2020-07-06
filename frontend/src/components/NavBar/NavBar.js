import React from 'react';
import myclasses from './NavBar.module.css';
import { AppBar, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
const NavBar = () => {
    //custimized style could not be applied to the Material UI Components
    const useStyles = makeStyles((theme) => ({
          appBar: {
            zIndex: theme.zIndex.drawer + 1,
          }
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
                        <li><Link to="/" > HOME </Link></li>
                        <li><Link to="/viewUsers" > USERS </Link></li>
                    </ul>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default NavBar