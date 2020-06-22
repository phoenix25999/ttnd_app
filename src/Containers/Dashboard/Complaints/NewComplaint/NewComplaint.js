import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import classes from './NewComplaint.module.css';
import Input from '../../../../Components/UI/Input/Input';
import { RiImageAddLine } from 'react-icons/ri';
import axios from 'axios';

class NewComplaint extends Component{

  state = {
    complaintForm: {
      department: {
        elementType: 'select',
        elementConfig: {
            options: [
              {value: 'Hardware', displayValue: 'Hardware'},
              {value: 'Infra', displayValue: 'Infra'},
              {value: 'Other', displayValue: 'Other'}
            ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: true
      },
      title: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5
        },
        valid: false,
        touched: false
      },
      name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
            minLength: 2
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
      },
      concern: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 500
        },
        valid: true,
        touched: false
      },          
      attachment: {
        elementType: 'input',
        elementConfig: {
            type: 'file',
            placeholder: 'Your Name'
        },
        value: '',
        validation: {},
        valid: true
      }
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

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

  inputChangeHandler = (event, inputIdentifier)=>{
    const updatedComplaintForm = {
      ...this.state.complaintForm
    };

    const updatedFormElement = {
      ...updatedComplaintForm[inputIdentifier]
    };
    

    if(inputIdentifier!=='attachment'){
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedFormElement.touched = true;
      
    }

    else{
      let fileData = new FileReader();
      fileData.onloadend = (e) => {
        let content = e.target.result;
       updatedFormElement.value = content;
      };
      fileData.readAsDataURL(event.target.files[0]);
      this.setState({imageName: event.target.files[0].name})
      updatedFormElement.touched=true;
    }

    let formIsValid = true;

    for (let inputIdentifier in updatedComplaintForm) {
        formIsValid = updatedComplaintForm[inputIdentifier].valid && formIsValid;
    }

    updatedComplaintForm[inputIdentifier] = updatedFormElement;
    this.setState({complaintForm: updatedComplaintForm, formIsValid: formIsValid});
  }

  reportComplaint = (event) => {
    event.preventDefault();

    let formData = {};
    for( let formElementIdentifier in this.state.complaintForm){
      formData[formElementIdentifier] = this.state.complaintForm[formElementIdentifier].value;
    }
    console.log(formData);
    axios.post('http://localhost:5000/complaint', formData)
      .then(res=>{
        const updatedComplaintForm = {
          ...this.state.complaintForm
        };

        for(let formElementIdentifier in updatedComplaintForm){
          updatedComplaintForm[formElementIdentifier].value='';
        }
        this.setState({complaintForm: updatedComplaintForm, imageName: ''});
        this.props.fetchComplaints();
      });    
      
  }

  render(){
    return (
      <div className={classes.NewComplaint}>
        <h4>Complaint Box</h4>
  
        <form onSubmit={this.reportComplaint} id='form'>
          <div className={classes.ComplaintBox}>
            <div className={classes.FormRow}>
              <Input
                elementType='select'
                options={this.state.complaintForm.department.elementConfig.options}
                label='Select Department'
                changed={(e)=>this.inputChangeHandler(e,'department')}
                value={this.state.complaintForm.department.value || ''}
              />
              <Input elementType='input'
               label='Issue Title' 
               changed={(e)=>this.inputChangeHandler(e,'title')} 
               value={this.state.complaintForm.title.value || ''}
               invalid={!this.state.complaintForm.title.valid}
               touched={this.state.complaintForm.title.touched}/>
            </div>

            <div className={classes.FormRow}>
              <Input elementType='input' 
                label='Your Name' 
                changed={(e)=>this.inputChangeHandler(e,'name')} 
                value={this.state.complaintForm.name.value || ''}
                invalid={!this.state.complaintForm.name.valid}
                touched={this.state.complaintForm.name.touched}
              />

              <Input elementType='input' 
                label='Email ID' 
                changed={(e)=>this.inputChangeHandler(e,'email')} 
                value={this.state.complaintForm.email.value || ''}
                invalid={!this.state.complaintForm.email.valid}
                touched={this.state.complaintForm.email.touched}
              />
            </div>

            <div className={classes.TextAreaRow}>
              <Input elementType='textarea'
                label='Your Concern' 
                changed={(e)=>this.inputChangeHandler(e,'concern')} 
                value={this.state.complaintForm.concern.value || ''}
                invalid={!this.state.complaintForm.concern.valid}
                touched={this.state.complaintForm.concern.touched}
              />
            </div>

            <div className={classes.ImageUploadRow}>
              <label htmlFor='image'>
                <RiImageAddLine
                  className={classes.ImageButton}
                  title='Add Image'
                />
              </label>
              <input
                id='image'
                type='file'
                className={classes.ImageInput}
                accept='image/*'
                hidden
                onChange={(e)=>this.inputChangeHandler(e,'attachment')}
              />
              <p className={classes.ImageName}>
                {!this.state.imageName ? 'Attachment' : this.state.imageName}
              </p>
            </div>
            <div className={classes.SubmitRow}>
              <button className={classes.SubmitButton} disabled={!this.state.formIsValid}>Submit</button>
            </div>
          </div>
        </form>
  
      </div>
    );
  } 
};

const mapDispatchToProps = dispatch => {
  return{
      fetchComplaints: () => dispatch( actions.fetchComplaints() )
  };
};

export default connect( null, mapDispatchToProps )( NewComplaint );
