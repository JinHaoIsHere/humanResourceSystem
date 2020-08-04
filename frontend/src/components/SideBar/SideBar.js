import React from 'react';
//import classes from './SideBar.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RateReviewIcon from '@material-ui/icons/RateReview';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import myclasses from './SideBar.module.css';
import { withRouter } from 'react-router-dom';
const SideBar = (props) => {
    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            fontFamily: 'Chilanka',
        },
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: '#e5e4e2'
        },
        listItemText: {
            fontFamily: 'Chilanka'
        }
    }));
    const classes = useStyles();

    const currentPath = props.history.location.pathname;
    let listItems = null;
    if (currentPath === '/viewUsers' || currentPath === '/createUser') {
        listItems = (
            <React.Fragment>
                <ListItem button onClick={() => { props.history.push('/viewUsers') }}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='All Users' classes={{ primary: classes.listItemText }} />
                </ListItem>
                <ListItem button onClick={() => { props.history.push('/createUser') }}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary='Create User' classes={{ primary: classes.listItemText }}></ListItemText>
                </ListItem>
            </React.Fragment>
        );
    }
    else if (currentPath === '/viewContracts' || currentPath === '/createContract') {
        listItems = (
            <React.Fragment>
                <ListItem button onClick={() => { props.history.push('/viewContracts') }}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='All Contracts' />
                </ListItem>
                <ListItem button onClick={() => { props.history.push('/createContract') }}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary='Create Contract'></ListItemText>
                </ListItem>
            </React.Fragment>
        );
    } else if (currentPath === '/myTimesheet') {
        listItems = (
            <React.Fragment>
                <ListItem dense>
                    <ListItemText primary='Manage' classes={{ primary: classes.listItemText }} />
                </ListItem>
                <ListItem button
                    onClick={() => { props.history.push('/reviewTimesheet') }}>
                    <ListItemIcon><RateReviewIcon /></ListItemIcon>
                    <ListItemText primary='Review Contracts' classes={{ primary: classes.listItemText }} />
                </ListItem>
                <Divider />

                <ListItem dense>
                    <ListItemText primary='Active contract' classes={{ primary: classes.listItemText }} />
                </ListItem>
                {props.activeContract.map(item => {
                    return (
                        <ListItem button key={item._id}
                            onClick={() => { props.history.push('/myTimesheet/' + item._id) }}>
                            <ListItemIcon><EventAvailableIcon /></ListItemIcon>
                            <ListItemText primary={item.contractName} classes={{ primary: classes.listItemText }} />
                        </ListItem>
                    )
                })}
                <Divider />

                <ListItem dense>
                    <ListItemText primary='Expired contract' classes={{ primary: classes.listItemText }} />
                </ListItem>
                <ListItem button
                    >
                    <ListItemIcon><EventBusyIcon /></ListItemIcon>
                    <ListItemText primary='EG Expired' classes={{ primary: classes.listItemText }} />
                </ListItem>
            </React.Fragment>
        );
    }
    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={myclasses.DrawerContainer}>

                    <Divider />
                    <List>
                        {listItems}
                    </List>
                </div>
            </Drawer>
        </div>
    )
}

export default withRouter(SideBar)