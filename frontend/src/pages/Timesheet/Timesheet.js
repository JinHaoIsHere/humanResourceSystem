import React, { useState, useEffect } from 'react';
import TimesheetsInContract from './TimesheetsInContract';
import { makeStyles } from '@material-ui/core/styles';
import AlarmIcon from '@material-ui/icons/Alarm';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import MaterialTable from 'material-table';
import axios from 'axios';
import * as actions from '../../store/actions';
import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Timesheet = (props) => {
    const contractList = useSelector(state => state.contract.contractList);
    const contractId = props.match.params.id;
    const timesheetDate = props.match.params.date;
    const currentContract = contractList.find(item => item._id == contractId);
    const dispatch = useDispatch();
    const createToastr = (type, message) => dispatch(actions.createToastr(type, message));
    const fetchContracts = () => dispatch(actions.fetchContracts());

    const useStyles = makeStyles((theme) => ({
        card: {
            width: '1300px',
            height: 'auto',
            margin: '20px auto',
            padding: '30px',
        },
        form: {
            width: '600px',
            margin: '0 auto',
        },
        textField: {
            margin: theme.spacing(1),
            width: '30ch',
            textAlign: 'start',
        },
        button: {
            marginRight: '20px',
            float: 'right',
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
        },
        totalTime: {
            float: 'right',
            marginRight: '20px',
        }
    }));
    const classes = useStyles();

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
    const [timesheetData, setState] = React.useState([]);



    const onSaveSheet = (status) => {

        const updateContract = {
            _id: contractId,
            timesheet: {
                ...currentContract.timesheet,
                [timesheetDate]: {
                    data: timesheetData,
                    status: status,
                },
            }
        }
        axios.post('/api/contract/update', updateContract)
            .then(response => {
                createToastr('success', response.data);
                if (status == "EDITING")
                    createToastr('success', 'Timesheet was saved!');
                else if (status == "PENDING")
                    createToastr('success', 'Timesheet was submitted!');
                //props.history.push('/viewContracts');
                fetchContracts();

            }).catch(error => {
                createToastr('error', error.response.data);
            });
    };

    if (!currentContract || !currentContract.timesheet || !currentContract.timesheet[timesheetDate]) {
        props.history.goBack();
        return <div>redirecting...</div>;
    }
    const currentTimesheet = currentContract.timesheet[timesheetDate];
    console.log('currentTimesheet: ' + currentTimesheet);
    if (timesheetData.length == 0 && currentTimesheet.data != 0) {
        setState(currentTimesheet.data);

    }
    let timesheet = null;
    let submitBtn = null;
    if (currentTimesheet) {
        let editableSetting = null;
        if (currentTimesheet.status == "EDITING") {
            editableSetting = {
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState];
                                data.push(newData);
                                return data;
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState];
                                    data[data.indexOf(oldData)] = newData;
                                    return data;
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState];
                                data.splice(data.indexOf(oldData), 1);
                                return data;
                            });
                        }, 600);
                    }),
                onCellEditFinished: () => {
                    console.log('edited finished');
                }
            };
            submitBtn = (
                <React.Fragment>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={onSaveSheet.bind(this, 'EDITING')}
                        color="primary">

                        Save
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={onSaveSheet.bind(this, 'PENDING')}
                        color="primary">
                        Submit
                    </Button>
                </React.Fragment>);
        }
        timesheet = (
            <MaterialTable
                icons={tableIcons}
                title={currentContract.contractName + ' - ' + timesheetDate + ' - ' + currentTimesheet.status}
                columns={columns}
                data={timesheetData}
                options={{
                    search: false
                }}
                editable={editableSetting}

            />
        );
    }
    const totalTime = timesheetData.reduce((acc, curr) => {
        let curTotal = 0;

        for (const [key, value] of Object.entries(curr)) {
            console.log(`${key}: ${value}`);
            if (typeof (value) == 'number' && !isNaN(value)) {
                curTotal += value;
            }
        }
        console.log(curTotal);
        return acc + curTotal;

    }, 0)
    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                <div className={classes.icon}>
                    <AlarmIcon />
                </div>
                <h2>Timesheet</h2>
            </div>
            <Card className={classes.card}>
                {timesheet}
                <div style={{ height: '50px', marginTop: '10px' }}>
                    <div className={classes.totalTime}><strong>total time : </strong>{totalTime}</div>
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => { props.history.push('../' + contractId) }}
                    color="primary">
                    Back
                </Button>
                {submitBtn}
            </Card>
        </React.Fragment>)
}

export default Timesheet;