import React from "react";
import styles from './UserForm.module.css';

const UserForm = props => {
  let inputElement = null;
  const inputClasses = [props.className];
  let errorMessage = props.invalid&&props.touched? <p style={{color:'#ff0000', fontSize:'12px'}}>Please enter a valid data</p> : '';
  
  if (props.invalid && props.touched) { 
    inputClasses.push(styles.Invalid);
  }

  switch( props.elementType ){
    case 'input' :
        inputElement = <input 
            type='text'
            placeholder={props.placeholder}
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}
            />
        break;
    case 'select':
        inputElement = (
          <select 
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
            
            <option defaultValue=''  >Role</option>
            {props.options?props.options.map(option => (
              <option key={option.value} value={option.value} >{option.displayValue}</option>
            )):''}
          </select>
        );
        break;
    default :
        inputElement = <input 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}/>;
  }

  return (    
          <div style={{width:'47%'}}>
            {inputElement}
            {errorMessage}
          </div>
  );
};

export default UserForm;