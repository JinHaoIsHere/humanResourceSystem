import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Card from '../../components/Card/Card';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import permissions from '../../utils/permissions';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const CreateUser = (props) => {
    const [form, setForm] = React.useState({
        password: '',
        lastname: '',
        firstname: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        role: '',
        permission: [],
    });
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
    const onSubmitHandler = (event) => {
        //validate
        if (!form.email || !form.password) {
            props.createToastr('error', 'Required fields are not filled');
            return;
        }
        //send login info validation to API
        axios.post('/api/admin/createUser', { ...form })
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
            margin: '0 auto'
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

    return (
        <div>

            <div className={classes.pageHeader}>
                Create Users
            </div>

            <Card className={classes.card}>
                <form className={classes.form}>
                    <TextField
                        required
                        style={{ margin: '8px', width: '62.2ch', }}
                        id="email"
                        label="Email"
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
                        id="phone"
                        label="Phone"
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
                        className={classes.textField}
                        id="lastname"
                        label="LastName"
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
                    />
                </form>
                <div>
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
                </div>

            </Card>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createToastr: (type, message) => dispatch(actions.createToastr(type, message)),
        fetchUserList: () => dispatch(actions.fetchUserList()),
    }
}
export default connect(null, mapDispatchToProps)(CreateUser);