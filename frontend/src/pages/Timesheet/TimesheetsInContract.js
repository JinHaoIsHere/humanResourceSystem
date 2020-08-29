import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as actions from '../../store/actions';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HistoryIcon from '@material-ui/icons/History';
import EventNoteIcon from '@material-ui/icons/EventNote';

const TimesheetsInContract = (props) => {
    const contractId = props.match.params.id;
    const contractList = useSelector(state => state.contract.contractList);
    const dispatch = useDispatch();
    const createToastr = (type, message) => dispatch(actions.createToastr(type, message));
    const fetchContracts = () => dispatch(actions.fetchContracts());

    const useStyles = makeStyles((theme) => ({
        card: {
            width: '900px',
            margin: '0 auto'
        },
        pageHeader: {
            display: 'flex',
            width: '900px',
            padding: '20px',
            alignItems: 'center',
            margin: '0 auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '50px 150px 150px 150px',
            // width: '700px',
        },
        title: {
            fontWeight: 'bold',
            marginBottom: '10px',
            borderBottom: '2px solid #1A1D1A',
        },
        timeCard: {
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
        contractInfo: {
            width: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '400px 145px 145px 145px',
            gridTemplateRows: '145px',
            gridColumnGap: '21.67px',
            alignContent: 'space-between',
            marginBottom: '21px',
        },
        info: {
            textAlign: 'left',
        }
    }));
    const classes = useStyles();

    let sheetList = <React.Fragment><div /><div /><Spinner /></React.Fragment>;
    let contractSum = null;
    let countTimesheet = 0;
    let countWeeklyHours = 0;
    let countTotalHours = 0;
    if (contractList.length > 0) {
        console.log(props.match.params.id);
        console.log(contractList);
        const currentContract = contractList.find(item => item._id == contractId);
        if (!currentContract) {
            createToastr('error', 'ContractId is invalid');
            return (<Redirect to='/myTimesheet' />);
        }
        contractSum = (
            <div className={classes.info}>
                <div><strong>Propject Name:</strong> {currentContract.contractName}</div>
                <div><strong>Contract Date:</strong>
                    {moment(currentContract.startDate).format('YYYY-MM-DD')} to {moment(currentContract.endDate).format('YYYY-MM-DD')}</div>
                <div><strong>Employer:</strong> {currentContract.employer}</div>
                <div><strong>Manager:</strong> {currentContract.managerName}</div>
            </div>);
        //check if the new week timesheet object should be inserted into contractObj based o
        //1. if the timesheet field is null
        //2. timesheet is not null but the current timesheet is null
        const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const momNow = moment();
        const isValid = moment(currentContract.startDate) < momNow && momNow < moment(currentContract.endDate);

        if ((!currentContract.timesheet || !currentContract.timesheet[startOfWeek]) && isValid) {
            const updateContract = {
                _id: currentContract._id,
                timesheet: {
                    ...currentContract.timesheet,
                    [startOfWeek]: {
                        data: [],
                        status: 'EDITING',
                        sum: 0,
                    },
                }
            }
            axios.post('/api/contract/update', updateContract)
                .then(response => {
                    createToastr('success', response.data);
                    createToastr('success', 'Timesheet of new week was created');
                    //props.history.push('/viewContracts');
                    fetchContracts();

                }).catch(error => {
                    createToastr('error', error.response.data);
                });
        } else {
            const timesheets = currentContract.timesheet;
            for (let time in timesheets) {
                countTimesheet++;
                countTotalHours += (timesheets[time].sum ? timesheets[time].sum : 0);
                if (time === startOfWeek) {
                    countWeeklyHours = (timesheets[time].sum ? timesheets[time].sum : 0);
                }
            }
            const start = moment(currentContract.startDate).startOf('isoWeek');
            sheetList = Object.keys(timesheets).map((date, index) => {
                console.log(timesheets[date]);
                const diff = moment(date).diff(start, 'days');
                // return (<div key={date}>
                //     <Link to={props.match.url + '/' + date}>{date} - {timesheets[date].status}</Link>
                // </div>);
                return (
                    <React.Fragment>
                        <div key={'c1_' + index}>{index + 1}</div>
                        <div key={'c2_' + index}>{'week ' + Math.round(diff / 7 + 1)}</div>
                        <div key={'c3_' + index}>{date}</div>
                        <div key={'c4_' + index}><Link to={props.match.url + '/' + date}>{timesheets[date].status}</Link></div>
                    </React.Fragment>)
            });
            
        }



    }
    //console.log(contractList);




    return (
        <React.Fragment>
            <div className={classes.pageHeader}>
                My Timesheet
            </div>
            <div className={classes.contractInfo}>
                <Card className={classes.timeCard}>
                    {contractSum}
                </Card>
                <Card className={classes.timeCard}>
                    <div className='cardIcon'><EventNoteIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countTimesheet}</div>
                    <div className='cardDes'>Total Timesheets</div>
                </Card>
                <Card className={classes.timeCard}>
                    <div className='cardIcon'><AvTimerIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countWeeklyHours}h</div>
                    <div className='cardDes'>Hours This Week</div>
                </Card>
                <Card className={classes.timeCard}>
                    <div className='cardIcon'><HistoryIcon fontSize='inherit' /></div>
                    <div className='cardHour'>{countTotalHours}h</div>
                    <div className='cardDes'>Total Hours</div>
                </Card>
            </div>

            <Card className={classes.card}>
                <div className={classes.grid}>
                    <div className={classes.title}>#</div>
                    <div className={classes.title}>SEQ</div>
                    <div className={classes.title}>DATE</div>
                    <div className={classes.title}>STATUS</div>
                    {sheetList}
                </div>
            </Card>

        </React.Fragment>
    );
}


export default TimesheetsInContract;