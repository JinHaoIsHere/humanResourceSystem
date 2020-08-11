import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';
//import classes from './Login.module.css';
const Login = (props) => {
    const [form, setForm] = React.useState({
        email: null,
        password: null,
    });

    const onChangeHandler = (event) => {
        let updatedForm = { ...form };
        if (event.target.id === 'loginEmail') {
            updatedForm.email = event.target.value;
        } else if (event.target.id === 'loginPw') {
            updatedForm.password = event.target.value;
        }
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {

        //validate
        if (!form.email || !form.password) {
            return;
        }
        //send login info validation to API
        axios.post('/api/login', { ...form })
            .then(response => {
                if (response.data) {
                    props.onLoginToken(response.data.userToken, response.data.userInfo);
                    props.history.push('/');
                }else{
                    props.createToastr('error', 'something went wrong');
                }

            })
            .catch(error => {
                console.log(error);
                props.createToastr('error', error.response.data);
            });
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '500px',
            height: 'auto',
            margin: '150px auto',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 0',
            borderRadius: '10px',
            backgroundColor: '#F5F5F4',
        },
        marginTop: {
            marginTop: '20px',
        },
        forgetPw: {
            width: '226px',
            textAlign: 'left',
            marginTop: '15px',
            marginBottom: '-5px',
            '& a': {
                color: 'grey',
                "&:hover": {
                    color: '#1A1D1A'
                }
            }
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <div className={classes.card}>
                <h1 style={{ width: '226px', textAlign: 'left' }}>Log In</h1>
                <TextField
                    required
                    id="loginEmail"
                    label="Email"
                    onChange={onChangeHandler}
                    variant="outlined"
                />
                <TextField
                    required
                    className={classes.marginTop}
                    id="loginPw"
                    label="Password"
                    onChange={onChangeHandler}
                    variant="outlined"
                    type="password"
                />
                <div className={classes.forgetPw}>
                    <Link to='#'>Forget password?</Link>
                </div>
                <Button variant="contained"
                    onClick={onSubmitHandler}
                    style={{ width: '226px' }}
                    className={classes.marginTop} color="primary">
                    Log In
                    </Button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLoginToken: (userToken, userInfo) => dispatch(actions.loginUser(userToken, userInfo)),
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
    }
}

export default connect(null, mapDispatchToProps)(Login);