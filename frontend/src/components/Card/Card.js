import React from 'react';
import classes from './Card.module.css';
const Card = props => {
    const newProps = {...props};
    let classN = classes.Card;
    if(newProps.className){
        classN = classN +' '+ newProps.className;
        
        delete newProps.className;
    }
    return (
        <div className={classN} {...newProps}>
            {newProps.children}
        </div>
    )
};

export default Card;