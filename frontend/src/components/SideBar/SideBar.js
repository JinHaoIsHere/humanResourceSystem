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
        },
        drawerPaper: {
            width: drawerWidth,
        }
    }));
    const classes = useStyles();

    const currentPath = props.history.location.pathname;
    console.log(currentPath);
    let listItems = null;
    if (currentPath === '/viewUsers' || currentPath === '/createUser') {
        listItems = (
            <React.Fragment>
                <ListItem button onClick={() => { props.history.push('/viewUsers') }}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary='All Users' />
                </ListItem>
                <ListItem button onClick={() => { props.history.push('/createUser') }}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary='Create User'></ListItemText>
                </ListItem>
            </React.Fragment>
        );
    }
    else if(currentPath==='/viewContracts' || currentPath==='/createContract'){
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
                    <List>
                        {listItems}
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary='Group 1' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary='Group 2' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary='Group 3' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><ListIcon /></ListItemIcon>
                            <ListItemText primary='Group 4' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    )
}

export default withRouter(SideBar)