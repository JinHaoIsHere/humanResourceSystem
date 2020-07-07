import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
//import classes from './Login.module.css';
const Login = (props) => {
    const [form, setForm] = React.useState({
        username: null,
        password: null,
    });

    const onChangeHandler = (event) => {
        let updatedForm = { ...form };
        if (event.target.id === 'loginName') {
            updatedForm.username = event.target.value;
        } else if (event.target.id === 'loginPw') {
            updatedForm.password = event.target.value;
        }
        setForm(updatedForm);
    }
    const onSubmitHandler = (event) => {
        console.log(event);
        //validate
        if(!form.username || !form.password){
            return;
        }
        //send login info validation to API
        axios.post('/api/login', {...form})
        .then(response=>{
            console.log(response.data);
            if(response.data.user){
                props.history.push('/viewUsers');
            }
            else{
                alert('wrong username or password');
            }
        });
        
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '500px',
            height: 'auto',
            margin: '20px auto',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        marginTop: {
            marginTop: '20px',
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card}>
                <TextField
                    required
                    id="loginName"
                    label="UserName"
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
                <Button variant="contained"
                    onClick={onSubmitHandler}
                    className={classes.marginTop} color="primary">
                    Log In
                    </Button>
            </Card>
        </div>
    );
}

export default Login;