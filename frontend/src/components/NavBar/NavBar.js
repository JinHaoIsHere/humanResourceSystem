import React from 'react';
import myclasses from './NavBar.module.css';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logoImg from '../../static/authrightLOGO.png';
// import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
// import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions';
import permissions from '../../utils/permissions';
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const NavBar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //custimized style could not be applied to the Material UI Components
    const useStyles = makeStyles((theme) => ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#393D3F',
        },
        name: {
        }
    }));
    const classes = useStyles();

    const currentPath = props.history.location.pathname;
    let userIcon = null;
    if(props.currentUser){
        userIcon = (<React.Fragment><div style={{
            backgroundColor: '#eee',
            borderRadius: '50%',
            flex: '0 0 30px',
            height: '30px'
        }}
            onClick={handleClick}>
        </div>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
    >
        <MenuItem>
            <ListItemText primary={props.currentUser} />
        </MenuItem>
        <Divider />
        <MenuItem>
            <ListItemText primary="Log Out" onClick={()=>{setAnchorEl(null); props.onLogOut();}}/>
        </MenuItem>
    </StyledMenu></React.Fragment>);
    }else if(currentPath!=='/login'){
        userIcon = (<div className={myclasses.Login}><Link to="/login" > LOG IN </Link></div>);
    }

    return (
        <React.Fragment>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/* <Typography variant="h6" noWrap style={{width:'200px'}}>
                        Authright HRS
                    </Typography> */}
                    {/* <img src={logoImg} alt='logo' style={{ width: '170px' }}></img> */}
                    <div className={myclasses.NavLogo}>AUTHRIGHT</div>
                    <ul className={myclasses.NavItems}>
                        <li><Link to="/" > HOME </Link></li>
                        {props.currentUser ? <li><Link to="/myTimesheet" > MY TIMESHEET </Link></li> : null}
                        {props.currentUserPerm.indexOf(permissions.CONTRACT_MANAGEMENT)>=0 ? <li><Link to="/viewContracts" > CONTRACT </Link></li> : null}
                        {props.currentUserPerm.indexOf(permissions.USER_MANAGEMENT)>=0 ? <li><Link to="/viewUsers" > USERS </Link></li> : null}
                    </ul>
                    {userIcon}
                    
                    
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: ()=>dispatch(actions.logoutUser()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));