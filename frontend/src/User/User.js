import React from 'react';

const user = (props) => {
    return (
        <div className="User">
            <p>{props.required}</p>
            <input type="text" id="#" name="#" onChange={props.changed}/>
            <p>{props.optional}</p>
            <input type="text" id="#" name="#" onChange={props.changed}/>
        </div>
    )
};

export default user;