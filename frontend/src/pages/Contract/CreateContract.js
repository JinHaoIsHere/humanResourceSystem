import React, { useState } from 'react';
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

const CreateContract = (props) => {

    const [form, setForm] = React.useState({
        employer: null,
        employee: '',
        startDate: null,
        endDate: null,
    });
    const onChangeHandler = (event, field = null) => {
        if (!event) return;
        let updatedForm = { ...form };
        if (event instanceof Date) {
            updatedForm[field] = event;
        } else {
            updatedForm[event.target.name] = event.target.value;
        }
        console.log(updatedForm);
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {
        //validate

        //send login info validation to API
        axios.post('/api/admin/createUser', { ...form })
            .then(response => {
                props.createToastr(response.data);
                props.history.push('/viewUsers');
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

    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                <div className={classes.icon}>
                    <GroupIcon />
                </div>
                <h2>Create Contract</h2>
            </div>
            <Card className={classes.card}>
                <form className={classes.form}>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserList: () => dispatch(actions.fetchUserList),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContract);

