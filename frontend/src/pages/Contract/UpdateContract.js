import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
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

const UpdateContract = (props) => {

    const [form, setForm] = React.useState(null);

    const contractId = props.match.params.id;
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
                props.createToastr('success',response.data);
                props.history.push('/viewContracts');
                props.fetchContracts();
            }).catch(error => {
                props.createToastr('error', error.response.data);
            });
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '1000px',
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
                    style={{ margin: '8px', width: '62.2ch', }}
                    name="contractName"
                    value={form.contractName}
                    label="Contract Name"
                    onChange={onChangeHandler}
                    variant="outlined"
                />
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
                <div className={classes.icon}>
                    <GroupIcon />
                </div>
                <h2>Update Contract</h2>
            </div>
            <Card className={classes.card}>
                {contractForm}
                <Button
                    variant="contained"
                    onClick={() => { props.history.push('/viewUsers') }}
                    style={{ marginLeft: '303px', marginRight: '20px' }}
                    color="primary">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onSubmitHandler}
                    color="primary">
                    Save
                </Button>
            </Card>
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

