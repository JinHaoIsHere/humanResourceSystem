import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HistoryIcon from '@material-ui/icons/History';
import moment from 'moment';
import { connect } from 'react-redux';
const MyTimesheetSummary = props => {

    const useStyles = makeStyles((theme) => ({
        page: {
            display: 'grid',
            gridTemplateColumns: '47% 47%',
            gridTemplateRows: '30px 300px 300px',
            margin: '0 auto',
            justifyContent: 'space-between',
            gridColumnGap: '20px',
            padding: '20px'
        },
        card: {
            padding: '30px 0',
            borderRadius: '10px',
            backgroundColor: '#F5F5F4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '& .cardIcon': {
                fontSize: '50px',
                height: '56px',
                color: '#ff8c42'
            },
            '& .cardHour': {
                fontSize: '30px',
                fontWeight: 'bold',
            },
            '& .cardDes': {
                fontSize: '12px'
            },
        },
        title: {
            gridColumn: '1/3',
            justifySelf: 'start',
            padding: '0 20px',
        },
        timeCard: {
            display: 'grid',
            gridTemplateColumns: '145px 145px',
            gridTemplateRows: '145px 145px',
            gridColumnGap: '10px',
            alignContent: 'space-between'
        }

    }));
    const classes = useStyles();

    let countActContract = 0;
    let countTotContract = 0;
    let countWeeklyHours = 0;
    let countTotHours = 0;
    const momNow = moment();
    const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
    if (props.currentUserId && props.contractList) {
        props.contractList.forEach(item => {
            if (item.employee === props.currentUserId) {
                if (moment(item.startDate) < momNow && momNow < moment(item.endDate)) {
                    countActContract++;
                }
                countTotContract++;
                if (item.timesheet) {
                    for (let key in item.timesheet) {
                        countTotHours += (item.timesheet[key].sum ? item.timesheet[key].sum : 0);
                        if (key === startOfWeek) {
                            countWeeklyHours += (item.timesheet[key].sum ? item.timesheet[key].sum : 0);
                        }
                    }
                }
            }
        });
    }

    return (
        <div className={classes.page}>
            <div className={classes.title}>SUMMARY</div>
            <div className={classes.card}>
                <div style={{ height: '140px', width: '140px', backgroundColor: 'grey', alignSelf: 'center', borderRadius: '50%', marginBottom: '30px' }}>avatar</div>
                <div>Name: Hao Jin</div>
                <div>Email: hjin@usc.edu</div>
                <div>Title: Developer</div>
            </div>
            <div className={classes.timeCard}>
                <div className={classes.card}>
                    <div className='cardIcon'><EventNoteIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countTotContract}</div>
                    <div className='cardDes'>Assigned Contract</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><EventAvailableIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countActContract}</div>
                    <div className='cardDes'>Active Contract</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><AvTimerIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countWeeklyHours}h</div>
                    <div className='cardDes'>Hours This Week</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><HistoryIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countTotHours}h</div>
                    <div className='cardDes'>Total Hours</div>
                </div>
            </div>

        </div>);
};

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentLogInUser,
        currentUserId: state.user.currentLogInUserId,
        currentUserPerm: state.user.currentLogInUserPerm,
        contractList: state.contract.contractList,
        usersList: state.user.usersList,
    }
}

export default connect(mapStateToProps)(MyTimesheetSummary);