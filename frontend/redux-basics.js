//all those content is useless to the project and should be removed in the future
//just for reference when learning how Redux works
//If you want to run those code. use command `node redux-basics.js`

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0,
}
//reducer
const rootReducer = (state=initialState, action)=>{
    if(action.type==='INC_COUNTER'){
        return{
            ...state,
            counter: state.counter+1,}}
    if(action.type==='ADD_COUNTER'){
        return{
            ...state,
            counter: state.counter+action.value,}}
    return state;
};
//store
const store = createStore(rootReducer);
console.log(store.getState());
//subsription
store.subscribe(()=>{
    console.log('[subscription]', store.getState());
});
//dispatching action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
