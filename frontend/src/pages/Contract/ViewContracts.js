import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import moment from 'moment';

const ViewContracts = (props) => {
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
    let pagination = null; 
    if (props.contractList != null) {
        rows = (rowsPerPage > 0
            ? props.contractList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.contractList
        ).map((contract) => {
            const employee = props.usersList.filter(item=>{
                return item._id==contract.employee
            });
            let employeeName = '';
            
            if(employee.length){
                employeeName=employee[0].username;
            }
            const manager = props.usersList.filter(item=>{
                return item._id==contract.manager
            });
            let managerName = '';
            
            if(manager.length){
                managerName=manager[0].username;
            }
            return (
                <TableRow key={contract._id} onClick={()=>{props.history.push('/updateContract/'+contract._id)}}>
                    <TableCell align="center">{contract.contractName}</TableCell>
                    <TableCell align="center">{employeeName}</TableCell>
                    <TableCell align="center">{contract.employer}</TableCell>
                    <TableCell align="center">{managerName}</TableCell>
                    <TableCell align="center">{contract.startDate?moment(contract.startDate).format('YYYY-MM-DD'):null}</TableCell>
                    <TableCell align="center">{contract.endDate?moment(contract.endDate).format('YYYY-MM-DD'):null}</TableCell>
                </TableRow>
            )
        });
        pagination = (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.contractList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }

    const useStyles = makeStyles((theme) => ({
        card: {
            width: '1000px',
            height: 'auto',
            margin: '20px auto',
            padding: '30px',
        },
        pageHeader: {
            display: 'flex',
            height: '100px',
            padding: '20px',
            alignItems: 'center',
            backgroundColor: '#D9E9FC',
        },
        icon: {
            width: '60px',
            height: '60px',
            backgroundColor: '#ECF4FD',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            marginRight: '20px',
        }
    }));
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                <div className={classes.icon}>
                    <GroupIcon />
                </div>
                <h2>View Contracts</h2>
                <Button variant="contained"
                    color="primary" style={{ marginLeft: 'auto' }}
                    onClick={() => { props.history.push('/createContract') }}><AddIcon /></Button>
            </div>
            <Card className={classes.card}>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: '#7EB4F1' }}>
                                <TableRow>
                                    <TableCell align="center">Contract Name</TableCell>
                                    <TableCell align="center">Employee</TableCell>
                                    <TableCell align="center">Employer</TableCell>
                                    <TableCell align="center">Manager</TableCell>
                                    <TableCell align="center">Start Date</TableCell>
                                    <TableCell align="center">End Date</TableCell>
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
        contractList: state.contract.contractList,
        usersList: state.user.usersList,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewContracts);
//export default ViewUsers;