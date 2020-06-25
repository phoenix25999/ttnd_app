import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import BuzzForm from './BuzzForm/BuzzForm';

class NewBuzz extends Component{

  state = {
    buzzForm: {
      desc:{
        value: '',
        validation:{
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false
      },
      category:{
        options: [
          {value: 'Activity', displayValue: 'Activity'},
          {value: 'Lost & Found', displayValue: 'Lost & Found'},
        ],
        value: 'Activity',
        validation: {
          required: true
        },
        valid: true,
        touched: true
      },
      image:{
        value: '',
        valid: true,
        validation: {},
        touched: true
      }
    },
    formIsValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    return isValid;
}

  changeHandler = (event, inputIdentifier)=>{
    const updatedBuzzForm = {
      ...this.state.buzzForm
    }

    const updatedFormElement = {
      ...updatedBuzzForm[inputIdentifier]
    }

    if(inputIdentifier!=='image'){
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true;
    }

    else{
      updatedFormElement.value=event.target.files;
      console.log(updatedFormElement.value);
    }

    let formIsValid = true;

    for (let inputIdentifier in updatedBuzzForm) {
      
        formIsValid = updatedBuzzForm[inputIdentifier].valid && formIsValid;
        
    }

    updatedBuzzForm[inputIdentifier] = updatedFormElement;
    this.setState({buzzForm: updatedBuzzForm, formIsValid: formIsValid});
  }

  createBuzz = (event) => {
    event.preventDefault();

    const buzzData = new FormData();
        buzzData.append('description',this.state.buzzForm.desc.value);
        buzzData.append('category',this.state.buzzForm.category.value);
        for(let i in this.state.buzzForm.image.value){
          if(this.state.buzzForm.image.value.hasOwnProperty(i) && i!=='length'){
            buzzData.append('myImage',this.state.buzzForm.image.value[i]);
          }
        }
        
        buzzData.append('email',this.props.email);
        console.log(this.state.buzzForm.image.value);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
        }
    };

    
    axios.post('http://localhost:5000/buzz', buzzData, config)
      .then(res=>{

        
        const updatedBuzzForm = {
          ...this.state.buzzForm
        };

        for(let formElementIdentifier in updatedBuzzForm){
          formElementIdentifier!=='image'? updatedBuzzForm[formElementIdentifier].value='':updatedBuzzForm[formElementIdentifier].value=[];
        }
        this.setState({buzzForm: updatedBuzzForm, imageName:''});
        this.props.fetchBuzz();
      }); 
  }

  render() {
    let imageNames = [];
    for(let i in this.state.buzzForm.image.value){
      if(this.state.buzzForm.image.value.hasOwnProperty(i)){
      imageNames.push(this.state.buzzForm.image.value[i].name);
      }
    }
    return (
      <div className={classes.NewBuzz}>
          <div className={classes.Header}>
            <FaPencilAlt style={{ margin: "0 0.3rem" }} />
            <h4>Create Buzz</h4>
          </div>
          <form onSubmit={this.createBuzz} action='/multiple-upload' method="post" encType="multipart/form-data">
          <div>
            <BuzzForm 
              className={classes.Form}
              elementType='textarea' 
              changed={(e)=>this.changeHandler(e,'desc')} 
              value={this.state.buzzForm.desc.value || ''}
              invalid={!this.state.buzzForm.desc.valid}
              touched={this.state.buzzForm.desc.touched}
            />
          </div>
          <div className={classes.FormFooter}>
            <div className={classes.FormOptions}>
              <div>
              <BuzzForm 
                className={classes.Category}
                elementType='select' 
                changed={(e)=>this.changeHandler(e,'category')} 
                options={this.state.buzzForm.category.options}
                value={this.state.buzzForm.category.value || ''}
                invalid={!this.state.buzzForm.category.valid}
                touched={this.state.buzzForm.category.touched}
              />
              </div>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <label htmlFor="image" >
                  <RiImageAddLine className={classes.ImageButton}
                  title="Add Image" />
                </label>
                <input
                  id='image'
                  name='myImage'
                  type="file"
                  className={classes.ImageInput}
                  accept="image/*"
                  hidden
                  onChange={(e)=>this.changeHandler(e,'image')}
                  multiple
                />
                <p className={classes.ImageName}>{imageNames.join(', ')}</p>
              </div>
            </div>
            <button className={classes.SubmitButton} title='Create Buzz' disabled={!this.state.formIsValid}>
              <TiLocationArrow /> 
            </button>
          </div>
          </form>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return{
      fetchBuzz: () => dispatch( actions.fetchBuzz() )
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( NewBuzz );