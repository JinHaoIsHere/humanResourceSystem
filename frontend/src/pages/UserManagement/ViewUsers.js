import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '../../components/Card/Card';
import CardContent from '@material-ui/core/CardContent';
import classes from './ViewUsers.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { makeStyles } from '@material-ui/core/styles';

const ViewUsers = (props) => {
    // const [usersList, setUsers] = useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let rows = (
        <TableRow><TableCell align="center">Loading...</TableCell></TableRow>
    );
    const useStyles = makeStyles((theme) => ({
        table: {
            '& th':{
                fontWeight: 'bold',
                fontFamily: 'Chilanka',
            },
            '& td': {
                fontFamily: 'Chilanka',
            },
            '& .MuiTypography-colorInherit':{
                fontFamily: 'Chilanka',                
            },
            '& p':{
                fontFamily: 'Chilanka',
            }
        },
        tablePag:{
            '& .MuiTypography-colorInherit':{
                fontFamily: 'Chilanka',                
            },
            '& .MuiSelect-root':{
                fontFamily: 'Chilanka',                
            },
            '& .MuiButtonBase-root':{
                fontFamily: 'Chilanka',                

            },
            '& .MuiSvgIcon-root':{
                color: '#ff8c42'
            }
        }
    }));
    const myclasses = useStyles();
    let pagination = null; //To prevent reading thouse variable before fetching usersList from backend
    if (props.usersList != null) {
        rows = (rowsPerPage > 0
            ? props.usersList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.usersList
        ).map((user) => {
            const perm = Array.isArray(user.permission) ? user.permission.join(', ') : '';
            const lastName = user.lastname?user.lastname:'';
            const userName = (user.firstname?user.firstname:'') + ' ' + lastName;
            
            console.log(user.lastname?user.lastname:'');
            console.log(userName);
            return (
                <TableRow key={user._id} onClick={()=>{props.history.push('/updateUser/'+user._id)}}>
                    {/* <TableCell align="center">{user.username}</TableCell> */}
                    {/* <TableCell align="center">{user.firstname}</TableCell> */}
                    <TableCell align="center">{userName}</TableCell>
                    {/* <TableCell align="center">{user.password}</TableCell> */}
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.title}</TableCell>
                    <TableCell align="center">{user.role}</TableCell>
                    <TableCell align="center">{perm}</TableCell>
                </TableRow>
            )
        });
        pagination = (
            <TablePagination
                className={myclasses.tablePag}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.usersList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }

    

    return (
        <React.Fragment>
            <div className={classes.PageHeader}>
                View Users
                <Button variant="contained"
                    color="primary" style={{ marginLeft: 'auto', height: '20px', backgroundColor: '#ff8c42'}}
                    onClick={() => { props.history.push('/createUser') }}><AddIcon /></Button>
            </div>
            <Card className={classes.Card}>
                <CardContent>
                    <TableContainer style={{width: '90%', margin: '0 auto'}}>
                        <Table aria-label="simple table" className={myclasses.table}>
                            <TableHead style={{ fontWeight:'bold' }}>
                                <TableRow>
                                    <TableCell align="center" style={{width:'150px'}}>Name</TableCell>
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

const mapStateToProps = state => {
    return {
        usersList: state.user.usersList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
//export default ViewUsers;