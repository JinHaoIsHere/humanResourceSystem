import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as actions from '../../store/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import axios from 'axios';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

const tableIcons = {
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
};

const ReviewTimesheet = (props) => {
    const [open, setOpen] = React.useState(false);
    const [confirmSheet, setConfirmSheet] = React.useState([]);
    const [curContractId, setCurContractId] = React.useState(null);
    const [curDate, setCurDate] = React.useState(null);
    const onOpenConfirmWindow = (data, contractId, date) => {
        setOpen(true);
        setConfirmSheet(data);
        setCurContractId(contractId);
        setCurDate(date);
        console.log('visiting', contractId);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onSaveSheet =(status)=>{
        const curContract = props.contractList.find(item=>item._id == curContractId);

        const updateContract = {
            _id: curContractId,
            timesheet: {
                ...curContract.timesheet,
                [curDate]: {
                    data:confirmSheet,
                    status: status,
                },
            }
        }
        axios.post('/api/contract/update', updateContract)
                .then(response => {
                    props.createToastr('success', response.data);
                    if(status == 'CONFIRMED')
                        props.createToastr('success', 'Timesheet was confirmed!');
                    if(status == 'EDITING')
                        props.createToastr('success', 'Timesheet was declined!');
                    //props.history.push('/viewContracts');
                    props.fetchContracts();
                    setOpen(false);

                }).catch(error => {
                    props.createToastr('error', error.response.data);
                    setOpen(false);
                });
    };

    const curUsr = props.usersList.find(item => item.username == props.currentUser);
    let managedContract = [];
    if (curUsr && props.contractList) {
        managedContract = props.contractList.filter(item => {
            return item.manager === curUsr._id;
        });
    }
    // console.log(managedContract);
    const managedTimesheet = managedContract.reduce((acc, curr) => {

        const userName = props.usersList.find(item => curr.employee == item._id)['username'];
        const sheets = Object.keys(curr.timesheet).map(date => {
            return { ...curr.timesheet[date], date: date, employee: userName, contractId: curr._id };
        })
        acc.push(...sheets);
        return acc;
    }, [])
    // console.log(managedTimesheet);
    let sheetList = null;

    sheetList = managedTimesheet.map((item, index) => {
        // console.log(item.data);
        return <div key={index} onClick={onOpenConfirmWindow.bind(this, item.data, item.contractId, item.date)}>{item.employee} - {item.date} - {item.status}</div>
    })
    const columns = [
        { title: 'Task Name', field: 'task' },
        { title: 'Monday', field: 'time1', type: 'numeric' },
        { title: 'Tuesday', field: 'time2', type: 'numeric' },
        { title: 'Wednesday', field: 'time3', type: 'numeric' },
        { title: 'Thursday', field: 'time4', type: 'numeric' },
        { title: 'Friday', field: 'time5', type: 'numeric' },
        { title: 'Saturday', field: 'time6', type: 'numeric' },
        { title: 'Sunday', field: 'time7', type: 'numeric' },
    ];
    let totalTime = 0;
    let dialog = null;
    if (open) {
        totalTime = confirmSheet.reduce((acc, curr) => {
            let curTotal = 0;

            for (const [key, value] of Object.entries(curr)) {
                console.log(`${key}: ${value}`);
                if (typeof (value) == 'number' && !isNaN(value)) {
                    curTotal += value;
                }
            }
            console.log(curTotal);
            return acc + curTotal;

        }, 0);

        dialog = (<Dialog
            open={open}
            fullWidth={true}
            maxWidth={'lg'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>

                <MaterialTable
                    icons={tableIcons}
                    title={'Confirm Time sheet'}
                    columns={columns}
                    data={confirmSheet}
                    options={{
                        search: false
                    }}
                />
                <div style={{ height: '50px', marginTop: '10px' }}>
                    <div sytle={{ float: 'right', marginRight: '20px' }}><strong>total time : </strong>{totalTime}</div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSaveSheet.bind(this, 'EDITING')} color="primary">
                    Decline
                </Button>
                <Button onClick={onSaveSheet.bind(this, 'CONFIRMED')} color="primary" autoFocus>
                    Confirme
                </Button>
            </DialogActions>
        </Dialog>);
    }
    return (
        <React.Fragment>
            <div>{sheetList}</div>
            {dialog}
        </React.Fragment>)
}

const mapStateToProps = state => {
    return {
        contractList: state.contract.contractList,
        usersList: state.user.usersList,
        currentUser: state.user.currentLogInUser,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchContracts: () => dispatch(actions.fetchContracts()),
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTimesheet);