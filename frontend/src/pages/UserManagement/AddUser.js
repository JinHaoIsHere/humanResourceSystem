import axios from "axios";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FromControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

// import User from '../UserManagement/User/User'

const AddUser = props => {
  const [attributesState, setAttributesState] = useState({
    username: null,
    firstname: null,
    email: null,
    lastname: null,
    password: null,
    title: null,
    permission: null,
    phone: null,
    role: null,
    address: null
  });
  const [otherState, setOtherState] = useState("Invalid");

  // const [values, setValues] = useState({});
  // console.log(values)

//   const permissions = [{ name: "a" }, { name: "b" }, { name: "c" }];
//   const permissions = [name: "a" }, { name: "b" }, { name: "c" }];

//   const roles = [{ name: "Admin" }, { name: "Manager" }, { name: "Employee" }];
  const roles = ["Admin", "Manager", "Employee"];

  const onChangeHandler = event => {
    let updatedAttributesState = { ...attributesState };
    // console.log(updatedAttributesState.attributes[0].name);
    // for (let i = 0; i < 10; i++) {
    let fieldName = event.target.name;
    if (fieldName in Object.keys(updatedAttributesState)) {
      updatedAttributesState[fieldName] = event.target.value;
    }
    setAttributesState(updatedAttributesState);
    // let fieldName = event.target.name;
    // const currentValues = {...values};
    // currentValues[fieldName] = event.target.value;
    // setValues(currentValues);
  };

  const onSubmitHandler = event => {
    console.log(event);
    for (let i = 0; i < 10; i += 2) {
      if (!attributesState[i]) {
        alert("Please fill in all the required fields!");
        break;
      }
    }
    axios
      .post("/addUser", { ...attributesState })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const resetHandler = event => {
    let blankState = {
      username: null,
      firstname: null,
      email: null,
      lastname: null,
      password: null,
      title: null,
      permission: null,
      phone: null,
      role: null,
      address: null
    };
    setAttributesState(blankState);
  };

  const useStyles = makeStyles(theme => ({
    appBar: {
      position: "relative"
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(3),
        // marginBottom: theme.spacing(6),
        padding: theme.spacing(3)
      }
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.appbar}>
        Create a New User
      </Typography>
      <Grid container spacing={3} className={classes.layout}>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            required
            label="User Name"
            name="username"
            fullWidth
            autoComplete="username"
            onChange={onChangeHandler}
            value={attributesState.username || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            label="First Name"
            fullWidth
            autoComplete="firstname"
            onChange={onChangeHandler}
            value={attributesState.firstname || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            required
            label="Email"
            fullWidth
            autoComplete="email"
            onChange={onChangeHandler}
            value={attributesState.email || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            label="Last Name"
            fullWidth
            autoComplete="lastname"
            onChange={onChangeHandler}
            value={attributesState.lastname || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            required
            label="Password"
            fullWidth
            autoComplete="password"
            onChange={onChangeHandler}
            value={attributesState.password || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            label="Title"
            fullWidth
            autoComplete="title"
            onChange={onChangeHandler}
            value={attributesState.title || ""}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Autocomplete
            multiple
            limitTags={3}
            options={permissions}
            getOptionLabel={option => option.name}
            defaultValue={[permissions[0], permissions[1], permissions[2]]}
            renderInput={params => (
              <TextField
                {...params}
                required
                variant="outlined"
                label="Permission"
                placeholder="Select a Permission"
              />
            )}
            onChange={onChangeHandler}
            value={attributesState.permission || ""}
          ></Autocomplete>
        </Grid> */}
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            label="Phone"
            fullWidth
            autoComplete="phone"
            onChange={onChangeHandler}
            value={attributesState.phone || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}> 
          <Autocomplete
            multiple
            //limitTags={2}
            options={[]}
            getOptionLabel={option => option}
            //defaultValue={[roles[0], roles[1], roles[2]]}
            renderInput={params => (
              <TextField
                {...params}
                required
                variant="outlined"
                label="Role"
                placeholder="Select a Role"
              />
            )}
            //onChange={onChangeHandler}
            value={""}
        />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.paper}>
          <TextField
            label="Address"
            fullWidth
            autoComplete="address"
            onChange={onChangeHandler}
            value={attributesState.address || ""}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FromControlLabel
            control={
              <Checkbox color="secondary" name="savedUser" value="yes" />
            }
            label="Remember details for next time"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={resetHandler}
            color="primary"
            className={classes.buttons}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={onSubmitHandler}
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddUser;
