import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as actions from '../../store/actions';
import {Link, Redirect} from 'react-router-dom';

const TimesheetsInContract = (props) => {
    const contractId = props.match.params.id;
    const contractList = useSelector(state => state.contract.contractList);
    const dispatch = useDispatch();
    const createToastr = (type, message) => dispatch(actions.createToastr(type, message));
    const fetchContracts = () => dispatch(actions.fetchContracts());
    let sheetList = null;
    if (contractList) {
        
        const currentContract = contractList.find(item => item._id == contractId);
        if(!currentContract){
            createToastr('error', 'ContractId is invalid');
            return (<Redirect to='/myTimesheet'/>);
        }
        //check if the new week timesheet object should be inserted into contractObj based o
        //1. if the timesheet field is null
        //2. timesheet is not null but the current timesheet is null
        const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DD');
        
        
        if (!currentContract.timesheet || !currentContract.timesheet[startOfWeek]) {
            const updateContract = {
                _id: currentContract._id,
                timesheet: {
                    ...currentContract.timesheet,
                    [startOfWeek]: {
                        data:[],
                        status:'EDITING'
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
            sheetList = Object.keys(timesheets).map(date=>{
                console.log(props.match.url+'/'+date);
                return (<div key={date}>
                    <Link to={props.match.url+'/'+date}>{date} - {timesheets[date].status}</Link>
                </div>)
            })
        }



    }
    //console.log(contractList);




    return (
    <div>
        timesheets in the contract
        {sheetList}
    </div>)
}


export default TimesheetsInContract;