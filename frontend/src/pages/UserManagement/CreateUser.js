import React from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const CreateUser = (props) => {
    const [form, setForm] = React.useState({
        username: null,
        password: null,
    });

    const onChangeHandler = (event) => {
        let updatedForm = { ...form };
        if (event.target.label === 'UserName') {
            updatedForm.username = event.target.value;
        } else if (event.target.id === 'loginPw') {
            updatedForm.password = event.target.value;
        }
        console.log(updatedForm);
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {
        console.log(event);
        //validate
        if (!form.username || !form.password) {
            return;
        }
        //send login info validation to API
        axios.post('/api/login', { ...form })
            .then(response => {
                console.log(response.data);
                if (response.data.userToken) {
                    // get JWT token from backend
                    // and save this token to redux
                    props.onLoginToken(response.data.userToken, form.username);
                    props.history.push('/viewUsers');
                }
                else {
                    props.onCreateToastr('error', 'Wrong Username or Password');
                }
            });
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '1000px',
            height: 'auto',
            margin: '20px auto',
            padding: '30px',
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            
        },
        form: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },

        marginTop: {
            // marginTop: '20px',
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <form className={classes.form}>
                    <TextField
                        required
                        id="UserName"
                        label="UserName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="FirstName"
                        label="FirstName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="LastName"
                        label="LastName"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Password"
                        label="Password"
                        onChange={onChangeHandler}
                        variant="outlined"
                        type='password'
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Email"
                        label="Email"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Address"
                        label="Address"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Role"
                        label="Role"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Phone"
                        label="Phone"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Permission"
                        label="Permission"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                    <TextField
                        required
                        className={classes.marginTop}
                        id="Role"
                        label="Role"
                        onChange={onChangeHandler}
                        variant="outlined"
                    />
                </form>

                <Button
                    variant="contained"
                    onClick={onSubmitHandler}
                    className={classes.marginTop} color="primary">
                    Log In
                </Button>
            </Card>
        </div>
    );
};


export default CreateUser;