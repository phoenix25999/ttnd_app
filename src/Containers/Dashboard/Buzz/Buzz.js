import React, { Component } from 'react';
import classes from './Buzz.module.css';
import NewBuzz from './NewBuzz/NewBuzz';
import ShowBuzz from './ShowBuzz/ShowBuzz';

class Buzz extends Component{
  componentDidMount(){
    window.document.title = 'Buzz';
  }

  render(){
    return (
      <div className={classes.Buzz}>
        <NewBuzz email={this.props.email}/>
        <ShowBuzz email={this.props.email}/>
      </div>
    );
  }
  
};

export default Buzz;
