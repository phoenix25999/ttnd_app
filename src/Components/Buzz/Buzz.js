import React, { useEffect } from "react";
import classes from "./Buzz.module.css";
import NewBuzz from "./NewBuzz/NewBuzz";

const Buzz = () => {
  useEffect(() => {
    window.document.title = 'Buzz';
  }, []);
  return (
    <div className={classes.Buzz}>
      <NewBuzz />
      <div className={classes.RecentBuzz}>RecentBuzz</div>
    </div>
  );
};

export default Buzz;
