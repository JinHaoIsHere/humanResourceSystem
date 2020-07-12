import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const Toastr = (props) => {

    const useStyles = makeStyles((theme) => ({
        animatedItemExiting: {
            animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
            opacity: 1,
        },
        "@keyframes myEffectExit": {
            "0%": {
                opacity: 1,
            },
            "80%": {
                opacity: 1,
            },
            "100%": {
                opacity: 0,
            }
        }
    }));
    const classes = useStyles();

    //item.type = info / error / warning / info
    const list = props.toastList.map((item, index) => {
        return (
            <Snackbar
                className={classes.animatedItemExiting}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={true}
                key={item.id}
                style={{ marginBottom: (index * 60) + 'px' }}
            >
                <MuiAlert severity={item.type} elevation={6} variant="filled">
                    {item.message}
                </MuiAlert >
            </Snackbar>
        )
    })
    return (
        <div>
            {list}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        toastList: state.layout.toastList,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps)(Toastr);