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
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Card from '../../components/Card/Card';
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
    const [curContractStatus, setCurContractStatus] = React.useState(null);
    const [curDate, setCurDate] = React.useState(null);
    const onOpenConfirmWindow = (data, contractId, date, status) => {
        setOpen(true);
        setConfirmSheet(data);
        setCurContractId(contractId);
        setCurDate(date);
        setCurContractStatus(status);
        console.log('visiting', contractId);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onSaveSheet = (status) => {
        const curContract = props.contractList.find(item => item._id == curContractId);

        const updateContract = {
            _id: curContractId,
            timesheet: {
                ...curContract.timesheet,
                [curDate]: {
                    data: confirmSheet,
                    status: status,
                },
            }
        }
        axios.post('/api/contract/update', updateContract)
            .then(response => {
                props.createToastr('success', response.data);
                if (status == 'CONFIRMED')
                    props.createToastr('success', 'Timesheet was confirmed!');
                if (status == 'EDITING')
                    props.createToastr('success', 'Timesheet was declined!');
                //props.history.push('/viewContracts');
                props.fetchContracts();
                setOpen(false);

            }).catch(error => {
                props.createToastr('error', error.response.data);
                setOpen(false);
            });
    };

    //const curUsr = props.usersList.find(item => item.username == props.currentUser);
    let managedContract = [];
    if (props.currentUserId && props.contractList) {
        managedContract = props.contractList.filter(item => {
            return item.manager === props.currentUserId;
        });
    }
    console.log(managedContract);
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '900px',
            margin: '0 auto'
        },
        form: {
            width: '600px',
            margin: '0 auto',
        },
        textField: {
            margin: theme.spacing(1),
            width: '30ch',
        },
        pageHeader: {
            display: 'flex',
            width: '900px',
            padding: '20px',
            alignItems: 'center',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '30px 100px 200px 150px 150px',
            // width: '700px',
        },
        title: {
            fontWeight: 'bold',
            marginBottom: '10px',
            borderBottom: '2px solid #1A1D1A',
        }
    }));
    const classes = useStyles();
    // console.log(managedContract);
    const managedTimesheet = managedContract.reduce((acc, curr) => {

        if (curr.timesheet) {
            const user = props.usersList.find(item => curr.employee == item._id);
            const lastName = user.lastname ? user.lastname : '';
            const userName = (user.firstname ? user.firstname : '') + ' ' + lastName;
            const sheets = Object.keys(curr.timesheet).map(date => {
                console.log(date);
                return { ...curr.timesheet[date], date: date, employee: userName, contractId: curr._id, projectName: curr.contractName };
            })
            acc.push(...sheets);
        }

        return acc;
    }, [])
    console.log(managedTimesheet);
    let tmpSheetList = null;

    // sheetList = managedTimesheet.map((item, index) => {
    //     // console.log(item.data);
    //     return <div key={index} onClick={onOpenConfirmWindow.bind(this, item.data, item.contractId, item.date)}>{item.employee} - {item.date} - {item.status}</div>
    // })
    tmpSheetList = managedTimesheet.filter(item=>item.status!=="EDITING").map((item, index) => {
        // console.log(item.data);
        //  
        let statusStyle = null;
        if (item.status == "PENDING") {
            statusStyle = { color: 'red'};
        } else if (item.status == "CONFIRMED") {
            statusStyle = { color: 'green' };
        } else {
            statusStyle = { color: 'orange' };
        }
        
        return <React.Fragment ><div key={'c1_' + index}>{index + 1}</div>
            <div key={'c2_' + index}>{item.employee}</div>
            <div key={'c3_' + index}>{item.projectName}</div>
            <div key={'c4_' + index}>{item.date}</div>
            <div key={'c5_' + index} style={statusStyle} onClick={onOpenConfirmWindow.bind(this, item.data, item.contractId, item.date, item.status)}>{item.status}</div></React.Fragment>
    });
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

        let diaBtn = null;
        if (curContractStatus === "PENDING") {
            diaBtn = (
                <DialogActions>
                    <Button onClick={onSaveSheet.bind(this, 'EDITING')} color="primary">
                        Decline
                    </Button>
                    <Button onClick={onSaveSheet.bind(this, 'CONFIRMED')} color="primary" autoFocus>
                        Confirme
                    </Button>
                </DialogActions>
            );
        }

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
            {diaBtn}
        </Dialog>);
    }
    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                Review Timesheet
            </div>
            <Card className={classes.card}>
                <div className={classes.grid}>
                    <div className={classes.title}>#</div> <div className={classes.title}>EMPLOYEE</div><div className={classes.title}>PROJECT NAME</div><div className={classes.title}>DATE</div><div className={classes.title}>STATUS</div>
                    {tmpSheetList}
                </div>
                {dialog}
            </Card>

        </React.Fragment>)
}

const mapStateToProps = state => {
    return {
        contractList: state.contract.contractList,
        usersList: state.user.usersList,
        currentUser: state.user.currentLogInUser,
        currentUserId: state.user.currentLogInUserId,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchContracts: () => dispatch(actions.fetchContracts()),
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTimesheet);