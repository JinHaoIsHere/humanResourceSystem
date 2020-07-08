import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classes from './ViewUsers.module.css';
import { connect } from 'react-redux';
const ViewUsers = (props) => {
    const [usersList, setUsers] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        if (usersList === null) {
            axios.get('/api/admin/usersList')
                .then(response => {
                    setUsers(response.data);
                });
        }
    });

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let rows = null, pagination = null; //To prevent reading thouse variable before fetching usersList from backend
    if (usersList != null) {
        rows = (rowsPerPage > 0
            ? usersList.userslist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : usersList.userslist
        ).map((user) => {
            return (
                <TableRow key={user._id}>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.firstname}</TableCell>
                    <TableCell align="center">{user.lastname}</TableCell>
                    {/* <TableCell align="center">{user.password}</TableCell> */}
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.title}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{user.permission.join(', ')}</TableCell>
                </TableRow>
            )
        });
        pagination = (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersList.userslist.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }

    console.log(props);
    return (
        <React.Fragment>
            <div className={classes.PageHeader}>
                <div className={classes.Icon}>
                    <GroupIcon />
                </div>
                <h2>View Users</h2>
                <Button variant="contained"
                    color="primary" style={{ marginLeft: 'auto' }}
                    onClick={() => { props.history.push('/addUser') }}><AddIcon /></Button>
            </div>
            <Card className={classes.Card}>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#7EB4F1' }}>
                                <TableRow>
                                    <TableCell align="center">User Name</TableCell>
                                    <TableCell align="center">First Name</TableCell>
                                    <TableCell align="center">Last Name</TableCell>
                                    {/* <TableCell align="center">Password</TableCell> */}
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
                    {pagination}
                </CardContent>
            </Card>
        </React.Fragment>

    )
}

// const mapStateToProps = state => {
//     return {
//         ctr: state.counter
//     };
// }

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: "INC_COUNTER" })
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
export default ViewUsers;