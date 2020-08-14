import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Card from '../../components/Card/Card';

import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const UpdateContract = (props) => {

    const [form, setForm] = React.useState(null);

    const contractId = props.match.params.id;
    const [openDialog, setOpenDialog] = React.useState(false);


    const triggerDialog = (bol) => {
        setOpenDialog(bol);
    };
    useEffect(() => {
        console.log(props.contractList);
        console.log(contractId);
        if (props.contractList) {
            const currentContract = props.contractList.filter(c => c._id == contractId);
            console.log(currentContract);
            if (currentContract.length > 0) {
                setForm(currentContract[0]);
            }
        }
    }, [props.contractList]);

    const onChangeHandler = (event, field = null) => {
        if (!event) return;
        let updatedForm = { ...form };
        if (event instanceof Date) {
            updatedForm[field] = event;
        } else {
            updatedForm[event.target.name] = event.target.value;
        }
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {
        console.log(form);
        //validate
        let pass = true;
        if (!form.contractName) {
            props.createToastr('error', 'Contract Name is required');
            pass = false;
        }
        if (!form.employee) {
            props.createToastr('error', 'Employee Name is required');
            pass = false;
        }
        if (!form.manager) {
            props.createToastr('error', 'Manager is required');
            pass = false;
        }
        if (!form.startDate || !form.endDate) {
            props.createToastr('error', 'Contract Date is required');
            pass = false;
        } else if (new Date(form.startDate).getTime() > new Date(form.endDate).getTime()) {
            props.createToastr('error', 'Contract Date is wrong');
            pass = false;
        }
        if (!pass)
            return;

        //send login info validation to API
        axios.post('/api/contract/update', { ...form })
            .then(response => {
                props.createToastr('success', response.data);
                props.history.push('/viewContracts');
                props.fetchContracts();
            }).catch(error => {
                props.createToastr('error', error.response.data);
            });
    }

    const onDeleteHandler = () => {
        setOpenDialog(false);
        axios.post('/api/contract/delete', { contractId: form._id })
            .then(response => {
                props.createToastr('success', response.data);
                props.history.push('/viewContracts');
                props.fetchContracts();
            }).catch(error => {
                props.createToastr('error', error.response.data);
            });
    };

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
            textAlign: 'start',
        },
        button: {
            marginRight: '20px',
            float: 'right',
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
        }
    }));
    const classes = useStyles();

    // const handleDateChange = (date) => {
    //     console.log(date);
    //   };
    let userOptions = null;
    if (props.usersList) {
        userOptions = props.usersList.map(item => {
            return (<MenuItem value={item._id} key={item._id}>{item.username}</MenuItem>)
        })
    }

    let contractForm = null;
    if (form) {
        contractForm = (
            <form className={classes.form}>
                <TextField
                    className={classes.textField}
                    name="contractName"
                    label="Contract Name"
                    value={form.contractName}
                    onChange={onChangeHandler}
                    variant="outlined"
                />
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel id="employee-select-outlined-label">Manager</InputLabel>
                    <Select
                        labelId="employee-select-outlined-label"
                        name="manager"
                        value={form.manager}
                        onChange={onChangeHandler}
                        label="Manager"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {userOptions}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel id="employee-select-outlined-label">Employee</InputLabel>
                    <Select
                        labelId="employee-select-outlined-label"
                        name="employee"
                        value={form.employee}
                        onChange={onChangeHandler}
                        label="Employee"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {userOptions}
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    name="employer"
                    label="Employer"
                    onChange={onChangeHandler}
                    value={form.employer}
                    variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker
                        className={classes.textField}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        margin="normal"
                        label="Contract Start"
                        value={form.startDate}
                        onChange={(date) => onChangeHandler(date, 'startDate')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        className={classes.textField}
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        inputVariant="outlined"
                        margin="normal"
                        label="Contract End"
                        value={form.endDate}
                        onChange={(date) => onChangeHandler(date, 'endDate')}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>


            </form>
        )
    }

    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                Update Contract
            </div>
            <Card className={classes.card}>
                {contractForm}
                <div>

                    <Button
                        variant="contained"
                        onClick={triggerDialog.bind(this, true)}
                        color="secondary"
                        startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => { props.history.push('/viewContracts') }}
                        style={{ marginLeft: '190px', marginRight: '20px' }}
                        color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onSubmitHandler}
                        color="primary">
                        Save
                    </Button>
                </div>
            </Card>
            <Dialog
                open={openDialog}
                onClose={triggerDialog.bind(this, false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove this contract from system?</DialogTitle>
                <DialogActions>
                    <Button onClick={triggerDialog.bind(this, false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onDeleteHandler} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        usersList: state.user.usersList,
        contractList: state.contract.contractList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchContracts: () => dispatch(actions.fetchContracts()),
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContract);

