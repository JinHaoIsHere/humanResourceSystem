import React, {useState} from 'react';
import './App.css';
import User from './User/User.js'

const app = props => {
  const [attributesState, setAttributesState] = useState({
    attributes: [
      {required: 'User Name *', optional: 'First Name'},
      {required: 'Email *', optional: 'Last Name'},
      {required: 'Password *', optional: 'Title'},
      {required: 'Permission *', optional: 'Phone'},
      {required: 'Role *', optional: 'Address'}
    ]
  });

  const [otherState, setOtherState] = useState('Invalid');

  const resetHandler = (event) => {
    setAttributesState({
      attributes: [
        {required: 'User Name *', optional: 'First Name'},
        {required: 'Email *', optional: 'Last Name'},
        {required: 'Password *', optional: 'Title'},
        {required: 'Permission *', optional: 'Phone'},
        {required: 'Role *', optional: 'Address'}
      ],
      otherState: attributesState.otherState
    });
  };

  // const style = {
  //   display: 'inline'
  // };

  return (
    <div className="App">
      <h1>Create a New User</h1>
      <User required={attributesState.attributes[0].required} optional={attributesState.attributes[0].optional}/>
      <User required={attributesState.attributes[1].required} optional={attributesState.attributes[1].optional}/>
      <User required={attributesState.attributes[2].required} optional={attributesState.attributes[2].optional}/>
      <User required={attributesState.attributes[3].required} optional={attributesState.attributes[3].optional}/>
      <User required={attributesState.attributes[4].required} optional={attributesState.attributes[4].optional}/>
      <button onClick={resetHandler}>Cancel</button>
      <button onClick={resetHandler}>Submit</button>
    </div>
  );
}

export default app;
