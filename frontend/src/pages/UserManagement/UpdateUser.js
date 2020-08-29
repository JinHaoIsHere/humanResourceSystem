import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import Card from '../../components/Card/Card';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import permissions from '../../utils/permissions';
import Spinner from '../../components/Spinner/Spinner';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const UpdateUser = (props) => {
    const [form, setForm] = React.useState(null);
    const userId = props.match.params.id;
    const [openDialog, setOpenDialog] = React.useState(false);


    const triggerDialog = (bol) => {
        setOpenDialog(bol);
    };

    useEffect(() => {
        axios.get('/api/admin/getUser?id=' + userId)
            .then(response => {
                const updatedForm = { ...response.data.user, password: '' };
                console.log(updatedForm);
                setForm(updatedForm);
            })
            .catch(error => {
                props.createToastr('error', error.response.data);
            });
    }, []);

    const onChangeHandler = (event) => {
        let updatedForm = { ...form };
        updatedForm[event.target.id] = event.target.value;
        setForm(updatedForm);
    }
    const onPermChangeHandler = (event, newValue) => {
        let updatedForm = { ...form };
        updatedForm.permission = newValue;
        setForm(updatedForm);
    }

    const onDeleteHandler = () => {
        setOpenDialog(false);
        axios.post('/api/admin/deleteUser', { userId: form._id })
            .then(response => {
                props.createToastr('success', response.data);
                props.history.push('/viewUsers');
                props.fetchUserList();
            }).catch(error => {
                props.createToastr('error', error.response.data);
            });
    };

    const onSubmitHandler = (event) => {
        //validate
        if (!form.email) {
            props.createToastr('error', 'Required fields are not filled');
            return;
        }

        console.log(form);

        //send login info validation to API
        axios.post('/api/admin/updateUser', { ...form })
            .then(response => {
                props.createToastr('success', response.data);
                props.history.push('/viewUsers');
                props.fetchUserList();
            }).catch(error => {
                props.createToastr('error', error.response.data);
            });
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            width: '900px',
            margin: '0 auto',
            '& *': {
                fontFamily: 'Chilanka',
            },
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
    const permissionOptions = Object.keys(permissions);

    let userForm = <Spinner />;
    if (form) {
        userForm = (<form className={classes.form}>
            <TextField
                required
                style={{ margin: '8px', width: '62.2ch', }}
                id="email"
                label="Email"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.email}
            />
            <TextField
                className={classes.textField}
                id="password"
                label="Password"
                onChange={onChangeHandler}
                variant="outlined"
                type='password'
                value={form.password}
                helperText="Leave it black to keep old password"
            />
            <TextField
                className={classes.textField}
                id="phone"
                label="Phone"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.phone}
            />
            <TextField
                className={classes.textField}
                id="firstname"
                label="FirstName"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.firstname}
            />
            <TextField
                className={classes.textField}
                id="lastname"
                label="LastName"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.lastname}
            />
            <TextField
                className={classes.textField}
                id="role"
                label="Role"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.role}
            />
            <TextField
                className={classes.textField}
                id="title"
                label="Title"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.title}
            />
            <TextField
                style={{ margin: '8px', width: '62.2ch', }}
                id="address"
                label="Address"
                onChange={onChangeHandler}
                variant="outlined"
                value={form.address}
            />
            <Autocomplete
                style={{ margin: '8px auto', width: '62.2ch', }}
                multiple
                id="checkboxes-tags-demo"
                options={permissionOptions}
                onChange={onPermChangeHandler}
                disableCloseOnSelect
                // getOptionLabel={(option) => option.title}
                // getOptionSelected={(option, value) => option.value === value.value}
                renderOption={(option, { selected }) => (
                    <React.Fragment>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
                    </React.Fragment>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Permissions" placeholder="Permission" />
                )}
                value={form.permission}
            />
        </form>)
    }
    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                Update User
            </div>
            <Card className={classes.card}>
                {userForm}
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
                        onClick={() => { props.history.push('/viewUsers') }}
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
                <DialogTitle id="alert-dialog-title">Remove this user from system?</DialogTitle>
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
};

const mapDispatchToProps = dispatch => {
    return {
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
        fetchUserList: () => dispatch(actions.fetchUserList()),
    }
}
export default connect(null, mapDispatchToProps)(UpdateUser);