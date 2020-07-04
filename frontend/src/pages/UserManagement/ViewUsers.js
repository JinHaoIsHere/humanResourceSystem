import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CssBaseline, Toolbar } from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import classes from './ViewUsers.module.css';
const ViewUsers = (props) => {
    const [usersList, setUsers] = useState(null);

    useEffect(() => {
        if (usersList === null) {
            axios.get('/api/admin/usersList')
                .then(response => {
                    setUsers(response.data);
                });
        }
    });

    let rows = null;
    if (usersList != null) {
        rows = usersList.userslist.map((user) => {
            return (
                <TableRow key={user._id}>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.firstname}</TableCell>
                    <TableCell align="center">{user.lastname}</TableCell>
                    <TableCell align="center">{user.password}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.title}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{user.permission.join(', ')}</TableCell>
                </TableRow>
            )
        });
    }
    return (
        <React.Fragment>
            <div className={classes.PageHeader}>
                <div className={classes.Icon}>
                    <GroupIcon />
                </div>
                <h2>View Users</h2>
                <Button variant="contained" color="primary" style={{ marginLeft: 'auto' }}><AddIcon /></Button>
            </div>
            <Card className={classes.Card}>
                <CardContent>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{backgroundColor:'#7EB4F1'}}>
                        <TableRow>
                            <TableCell align="center">User Name</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Password</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Permission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
                </CardContent>
            </Card>

            
        </React.Fragment>

    )
}


export default ViewUsers;