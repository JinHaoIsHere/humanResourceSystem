import axios from 'axios';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FromControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import User from '../UserManagement/User/User'

const UpdateUser = (props) => {
    const [attributesState,setAttributesState] = useState({
        attributes: [
            {name: 'User Name', detail: ''},
            {name: 'First Name', detail: ''},
            {name: 'Email', detail: ''},
            {name: 'Last Name', detail: ''},
            {name: 'Password', detail: ''},
            {name: 'Title', detail: ''},
            {name: 'Permission', detail: ''},
            {name: 'Phone', detail: ''},
            {name: 'Role', detail: ''},
            {name: 'Address', detail: ''},
        ]
    });

    const [otherState, setOtherState] = useState('Invalid');

    const permissions = [
        {name: 'a'},
        {name: 'b'},
        {name: 'c'},
    ];

    const roles = [
        {name: 'Admin'},
        {name: 'Manager'},
        {name: 'Employee'}
    ];

    const onChangeHandler = (event) => {
        let updatedAttributesState = {...attributesState};
        for (let i=0; i<10; i++) {
            updatedAttributesState.attributes[i].detail = event.target.value;
        }
        setAttributesState(updatedAttributesState);
    };

    const onSubmitHandler = (event) => {
        console.log(event);
        for (let i=0; i<10; i+=2) {
            if (!attributesState.attributes[i].detail) {
                alert('Please fill in all the required fields!');
                break;
            }
        };
        for (let i=0; i<10; i++) {
            axios.post('/updateUser', {...attributesState.attributes[i].detail})
            .then(response => {
               console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    const onDeleteHandler = (event) => {
        let updatedAttributesState = {...attributesState};
        for (let i=0; i<10; i++) {
            updatedAttributesState.attributes[i].detail = null;
        }
        setAttributesState(updatedAttributesState);
    };

    const useStyles = makeStyles((theme) => ({
        appBar: {
          position: 'relative',
        },
        layout: {
          width: 'auto',
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
          },
        },
        paper: {
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(2),
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(3),
            // marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
          },
        },
        buttons: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(1),
        },
        button: {
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(1),
        },
      }));

    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom className={classes.appbar}>Update a User</Typography>
            <Grid container spacing={3} className={classes.layout}>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField required id="username" label={attributesState.attributes[0].name} fullWidth autoComplete="username"/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField id="firstname" label={attributesState.attributes[1].name} fullWidth autoComplete="firstname"/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField required id="email" label={attributesState.attributes[2].name} fullWidth autoComplete="email"/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField id="lastname" label={attributesState.attributes[3].name} fullWidth autoComplete="lastname"/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField required id="password" label={attributesState.attributes[4].name} fullWidth autoComplete="password"/>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField id="title" label={attributesState.attributes[5].name} fullWidth autoComplete="title"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Autocomplete multiple limitTags={3} id="permission" options={permissions} getOptionLabel={(option) => option.name} defaultValue={[permissions[0], permissions[1], permissions[2]]} renderInput={(params) => (<TextField {...params} required variant="outlined" label={attributesState.attributes[6].name} placeholder="Select a Permission"/>)}>
                   </Autocomplete>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField id="phone" label={attributesState.attributes[7].name} fullWidth autoComplete="phone"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Autocomplete multiple limitTags={2} id="role" options={roles} getOptionLabel={(option) => option.name} defaultValue={[roles[0], roles[1], roles[2]]} renderInput={(params) => (<TextField {...params} required variant="outlined" label={attributesState.attributes[8].name} placeholder="Select a Role"/>)}>
                   </Autocomplete>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.paper}>
                    <TextField id="address" label={attributesState.attributes[9].name}fullWidth autoComplete="address"/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FromControlLabel 
                    control={<Checkbox color="secondary" name="savedUser" value="yes"/>} 
                    label="Remember details for next time"/>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="contained" onClick={onChangeHandler} color="primary" className={classes.buttons}>Cancel</Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="contained" onClick={onSubmitHandler} color="primary" className={classes.button}>Submit</Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="contained" onClick={onDeleteHandler} color="primary" className={classes.button}>Delete</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default UpdateUser;