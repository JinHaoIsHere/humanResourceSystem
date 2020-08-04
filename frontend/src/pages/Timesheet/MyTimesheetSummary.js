import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HistoryIcon from '@material-ui/icons/History';
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
                    <div className='cardHour'>3</div>
                    <div className='cardDes'>Assigned Contract</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><EventAvailableIcon fontSize='inherit' /></div>
                    <div className='cardHour'>4</div>
                    <div className='cardDes'>Active Contract</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><AvTimerIcon fontSize='inherit' /></div>
                    <div className='cardHour'>2.5h</div>
                    <div className='cardDes'>Hours This Week</div>
                </div>
                <div className={classes.card}>
                    <div className='cardIcon'><HistoryIcon fontSize='inherit' /></div>
                    <div className='cardHour'>30h</div>
                    <div className='cardDes'>Total Hours</div>
                </div>
            </div>

        </div>);
};

export default MyTimesheetSummary;