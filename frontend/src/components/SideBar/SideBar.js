import React from 'react';
//import classes from './SideBar.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Link} from 'react-router-dom'
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
const SideBar = () => {
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
        <div>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button>
                            <ListItemIcon><GroupIcon /></ListItemIcon>
                            <ListItemText primary='All Users' />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><PersonAddIcon /></ListItemIcon>
                            <ListItemText primary='Create User' to='/createUser'><Link to='/createUser'>Create</Link></ListItemText>
                        </ListItem>
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

export default SideBar