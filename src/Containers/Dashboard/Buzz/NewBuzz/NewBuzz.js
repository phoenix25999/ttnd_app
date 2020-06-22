import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import Input from '../../../../Components/UI/Input/Input';
import classes from './NewBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';

class NewBuzz extends Component{

  state = {
    buzzForm: {
      desc:{
        value: '',
        validatiion:{
          required: true,
          minLength: 100
        },
        valid: false,
        touched: false
      },
      category:{
        value: '',
        validatiion: {
          required: true
        },
        valid: false,
        touched: false
      },
      image:''
    },
    formIsValid: false,
    imageName:''
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
      let fileData = new FileReader();
      fileData.onloadend = (e) => {
        let content = e.target.result;
        updatedBuzzForm[inputIdentifier] = content;
      };
      fileData.readAsDataURL(event.target.files[0]);
      this.setState({imageName: event.target.files[0].name})
    }

    let formIsValid = true;

    for (let inputIdentifier in updatedBuzzForm) {
        formIsValid = updatedBuzzForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({buzzForm: updatedBuzzForm, formIsValid: formIsValid});
  }

  createBuzz = (event) => {
    event.preventDefault();
    const buzzData = {
      ...this.state.buzzForm,
      email: this.props.email
    }
    axios.post('http://localhost:5000/buzz', buzzData)
      .then(res=>{
        this.setState({buzzForm: {}, imageName:''});
        this.props.fetchBuzz();
      }); 
  }

  render() {
    return (
      <div className={classes.NewBuzz}>
          <div className={classes.Header}>
            <FaPencilAlt style={{ margin: "0 0.3rem" }} />
            <h4>Create Buzz</h4>
          </div>
          <form onSubmit={this.createBuzz}>
          <div>
            {/* <textarea
              id='desc'
              className={classes.Form}
              placeholder="Share your thoughts...."
              onChange={(e)=>this.changeHandler(e,'desc')}
              value={this.state.buzzForm.desc || ''}
            ></textarea> */}
            <Input 
              elementType='textarea' 
              changed={(e)=>this.changeHandler(e,'concern')} 
              value={this.state.buzzForm.desc.value || ''}
              invalid={!this.state.buzzForm.desc.valid}
              touched={this.state.buzzForm.desc.touched}
              buzz
            />
          </div>
          <div className={classes.FormFooter}>
            <div className={classes.FormOptions}>
              <div>
                <select className={classes.Category} onChange={(e)=>this.changeHandler(e,'category')} value={this.state.buzzForm.category || 'Category'}>
                  <option defaultValue="DEFAULT" disabled >
                    Category
                  </option>
                  <option value="Activity">Activity Buzz</option>
                  <option value="Lost & Found">Lost & Found Buzz</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <label htmlFor="image" >
                  <RiImageAddLine className={classes.ImageButton}
                  title="Add Image" />
                </label>
                <input
                  id="image"
                  type="file"
                  className={classes.ImageInput}
                  accept="image/*"
                  hidden
                  onChange={(e)=>this.changeHandler(e,'image')}
                />
                <p className={classes.ImageName}>{this.state.imageName}</p>
              </div>
            </div>
            <button className={classes.SubmitButton} title='Create Buzz'>
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