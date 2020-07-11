import React from 'react';
import myclasses from './NavBar.module.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logoImg from '../../static/authrightLOGO.png';
const NavBar = (props) => {
    //custimized style could not be applied to the Material UI Components
    const useStyles = makeStyles((theme) => ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        name: {
        }
    }));
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/* <Typography variant="h6" noWrap style={{width:'200px'}}>
                        Authright HRS
                    </Typography> */}
                    <img src={logoImg} alt='logo' style={{width:'170px'}}></img>
                    <ul className={myclasses.NavItems}>
                        <li><Link to="/" > HOME </Link></li>
                        <li><Link to="/viewUsers" > USERS </Link></li>
                        <li className={classes.name}>{'User:' + props.username}</li>
                    </ul>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        username: state.user.currentLogInUser,
    }
}

export default connect(mapStateToProps)(NavBar);