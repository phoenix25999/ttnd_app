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
        valid: false
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
      updatedFormElement.value = event.target.files;
      console.log(updatedFormElement.value);
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

    const complaintData = new FormData();
        complaintData.append('department',this.state.complaintForm.department.value);
        complaintData.append('title',this.state.complaintForm.title.value);
        complaintData.append('name',this.state.complaintForm.name.value);
        complaintData.append('email',this.state.complaintForm.email.value);
        complaintData.append('concern',this.state.complaintForm.concern.value);
        for(let i in this.state.complaintForm.attachment.value){
          if(this.state.complaintForm.attachment.value.hasOwnProperty(i) && i!=='length'){
            complaintData.append('attachment',this.state.complaintForm.attachment.value[i]);
          }
        }
        

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
        }
      }

    axios.post('http://localhost:5000/complaint', complaintData, config)
      .then(res=>{
        console.log(res);
        const updatedComplaintForm = {
          ...this.state.complaintForm
        };

        for(let formElementIdentifier in updatedComplaintForm){
          updatedComplaintForm[formElementIdentifier].value='';
        }
        this.setState({complaintForm: updatedComplaintForm});
        this.props.fetchComplaints();
      });    
      
  }

  render(){
    let attachments = [];
    for(let i in this.state.complaintForm.attachment.value){
      //console.log(this.state.complaintForm.attachment.value)
      if(this.state.complaintForm.attachment.value.hasOwnProperty(i)){
      attachments.push(this.state.complaintForm.attachment.value[i].name);
      }
    }
    return (
      <div className={classes.NewComplaint}>
        <h4>Complaint Box</h4>
  
        <form onSubmit={this.reportComplaint} id='form' method="post" encType="multipart/form-data">
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
                name='attachment'
                type='file'
                className={classes.ImageInput}
                accept='image/*'
                hidden
                onChange={(e)=>this.inputChangeHandler(e,'attachment')}
                multiple
              />
              <p className={classes.ImageName}>
                {!this.state.complaintForm.attachment.value? 'Attachment' : attachments.join(', ')}
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
