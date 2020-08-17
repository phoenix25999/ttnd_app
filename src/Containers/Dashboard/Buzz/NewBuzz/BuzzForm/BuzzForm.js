import React from "react";
import styles from './BuzzForm.module.css';

const BuzzForm = props => {
  let inputElement = null;
  const inputClasses = [props.className];

  if (props.invalid && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch( props.elementType ){
    case 'input' :
        inputElement = <input 
            type='text'
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}
            />;
        break;
    case 'select':
        inputElement = (
          <select 
            className={inputClasses.join(' ')}
            style={{backgroundColor: "white"}} 
            value={props.value}
            onChange={props.changed}>
            <option value='Category' disabled>Category</option>
            {props.options.map(option => (
              <option key={option.value} value={option.value} >{option.displayValue}</option>
            ))}
          </select>
        );
        break;
    case 'textarea' :
        inputElement = <textarea 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}
            placeholder={props.placeholder}
            ></textarea>
        break;
    default :
        inputElement = <input 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}/>;
  }

  return (
    <div >
      {inputElement}
    </div>
  );
};

export default BuzzForm;