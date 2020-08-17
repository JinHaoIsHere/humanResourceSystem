import React from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '../../components/Card/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import moment from 'moment';

const ViewContracts = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [search, setSearch] = React.useState('');

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onSearchHandler = (event) => {
        if (!event) return;
        setSearch(event.target.value);
    }

    const useStyles = makeStyles((theme) => ({
        card: {
            width: '900px',
            margin: '0 auto'
        },
        pageHeader: {
            display: 'flex',
            width: '900px',
            padding: '20px',
            alignItems: 'center',
            margin: '0 auto',
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
        },
        table: {
            '& th': {
                fontWeight: 'bold',
            },
            '& *': {
                fontFamily: 'Chilanka',
            },
        },
        tablePag: {
            '& .MuiToolbar-root *': {
                fontFamily: 'Chilanka',
            },
            '& .MuiSvgIcon-root': {
                color: '#ff8c42'
            }
        }
    }));
    const classes = useStyles();

    let rows = (
        <TableRow><TableCell align="center">Loading...</TableCell></TableRow>
    );
    let pagination = null;
    if (props.contractList != null) {

        let entireContractList = props.contractList;
        entireContractList = entireContractList.map(contractItem=>{
            const employee = props.usersList.find(item => {
                return item._id == contractItem.employee
            });
            let employeeName = '<not found>';
            if (employee) {
                employeeName = ((employee.firstname ? employee.firstname : '')
                    +' '+ (employee.lastname?employee.lastname:'')).trim();
            }
            const manager = props.usersList.find(item => {
                return item._id == contractItem.manager
            });
            let managerName = '<not found>';
            if (manager) {
                managerName = ((manager.firstname ? manager.firstname : '')
                +' '+ (manager.lastname?manager.lastname:'')).trim();
            }
            contractItem['employeeName']=employeeName;
            contractItem['managerName']=managerName;
            return contractItem;
        });
        if (search) {
            entireContractList = entireContractList.filter(item => {
                if (item.contractName && item.contractName.includes(search))
                    return true;
                else if (item.employeeName && item.employeeName.includes(search))
                    return true;
                else if (item.employer && item.employer.includes(search))
                    return true;
                else if (item.title && item.title.includes(search))
                    return true;
                else if (item.managerName && item.managerName.includes(search))
                    return true;
                return false;
            });
        }

        rows = (rowsPerPage > 0
            ? entireContractList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : entireContractList
        ).map((contract) => {
            
            return (
                <TableRow key={contract._id} onClick={() => { props.history.push('/updateContract/' + contract._id) }}>
                    <TableCell align="center">{contract.contractName}</TableCell>
                    <TableCell align="center">{contract.employeeName}</TableCell>
                    <TableCell align="center">{contract.employer}</TableCell>
                    <TableCell align="center">{contract.managerName}</TableCell>
                    <TableCell align="center">{contract.startDate ? moment(contract.startDate).format('YYYY-MM-DD') : null}</TableCell>
                    <TableCell align="center">{contract.endDate ? moment(contract.endDate).format('YYYY-MM-DD') : null}</TableCell>
                </TableRow>
            )
        });
        pagination = (
            <TablePagination
                className={classes.tablePag}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={props.contractList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        );
    }



    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                View Contracts
                <Button variant="contained"
                    color="primary" style={{ marginLeft: 'auto', height: '20px', backgroundColor: '#ff8c42' }}
                    onClick={() => { props.history.push('/createContract') }}><AddIcon /></Button>
            </div>
            <Card className={classes.card}>
                <CardContent>
                    <div style={{ width: '850px', margin: '0 auto' }} >
                        <Grid container spacing={1} alignItems="flex-end" justify="flex-end">
                            <Grid item>
                                <SearchIcon />
                            </Grid>
                            <Grid item>
                                <Input placeholder="Search" inputProps={{ 'aria-label': 'description' }} value={search} onChange={onSearchHandler} />
                            </Grid>
                        </Grid>
                    </div>
                    <TableContainer style={{ width: '850px', margin: '0 auto' }}>
                        <Table aria-label="simple table" className={classes.table}>
                            <TableHead>
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