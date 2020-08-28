import React, { useState } from 'react';
import NewBuzz from './NewBuzz/NewBuzz';
import ShowBuzz from './ShowBuzz/ShowBuzz';

const Buzz = () => {
  window.document.title='Buzz';

  const [pageNo, setPageNo] = useState(2);
  return (
    <div> 
      <NewBuzz setPageNo={setPageNo}/>
      <ShowBuzz pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  );
}

export default Buzz;
