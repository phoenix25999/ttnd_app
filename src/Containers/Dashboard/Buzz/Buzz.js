import React from 'react';
import NewBuzz from './NewBuzz/NewBuzz';
import ShowBuzz from './ShowBuzz/ShowBuzz';

const Buzz = () => {
  window.document.title='Buzz';
  return (
    <div> 
      <NewBuzz/>
      <ShowBuzz/>
    </div>
  );
}

export default Buzz;
