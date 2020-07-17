import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const CreateUser = (props) => {
    const [form, setForm] = React.useState({
        username: null,
        password: null,
        lastname: null,
        firstname: null,
        email: null,
        phone: null,
        address: null,
        title: null,
        role: null,
        permission: null,
    });
    const onChangeHandler = (event) => {
        let updatedForm = { ...form };
        updatedForm[event.target.id] = event.target.value;
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {
        //validate
        if (!form.username || !form.password) {
            props.createToastr('error', 'Required fields are not filled');
            return;
        }
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
    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                <div className={classes.icon}>
                    <GroupIcon />
                </div>
                <h2>Create Users</h2>
            </div>
            <Card className={classes.card}>
                <form className={classes.form}>
                    <TextField
                        className={classes.textField}
                        required
                        id="username"
                        label="UserName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="firstname"
                        label="FirstName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.textField}
                        id="password"
                        label="Password"
                        onChange={onChangeHandler}
                        variant="outlined"
                        type='password'
                    />
                    <TextField
                        className={classes.textField}
                        id="lastname"
                        label="LastName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="email"
                        label="Email"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />

                    <TextField
                        className={classes.textField}
                        id="role"
                        label="Role"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="phone"
                        label="Phone"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        id="title"
                        label="Title"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        style={{ margin: '8px', width: '62.2ch', }}
                        id="address"
                        label="Address"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        style={{ margin: '8px', width: '62.2ch', }}
                        id="permission"
                        label="Permission"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                </form>
                <Button
                    variant="contained"
                    onClick={()=>{props.history.push('/viewUsers')}}
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
};

const mapDispatchToProps = dispatch => {
    return {
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
    }
}
export default connect(null, mapDispatchToProps)(CreateUser);