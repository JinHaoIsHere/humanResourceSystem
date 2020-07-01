import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CssBaseline, Toolbar } from '@material-ui/core';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';

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
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <NavBar />
            <SideBar></SideBar>
            <div style={{textAlign:'left'}}>
            <Toolbar />
                <h2>View Users</h2>
                <Button variant="contained" color="primary">Create a new User</Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
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
            </div>
        </div>
    )
}


export default ViewUsers;