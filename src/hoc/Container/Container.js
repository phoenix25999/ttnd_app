import React from 'react';

const container = (props) => {
    return(
        <div style={{width:'90vw', margin:'auto'}}>{props.children}</div>
    );
};

export default container;