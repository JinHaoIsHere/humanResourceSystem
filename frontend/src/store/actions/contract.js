
import * as actionTypes from './actionTypes';
import axios from 'axios';
import {createToastrHelper} from './layout';


export const fetchContracts = () => {
    return dispatch => {
        axios.get('/api/contract/list')
            .then(res => {
                // console.log(res);
                // console.log(res.data);
                dispatch({ type: actionTypes.SET_CONTRACT_LIST, contractList: res.data.contractList })
            })
            .catch(err => {
                console.log(err);
                if(err.response)
                    createToastrHelper(dispatch, 'error', err.response.data);
            })
    }
}